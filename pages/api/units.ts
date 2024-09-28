// pages/api/units.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";
import redis from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Tentar buscar o cache no Redis
    const cachedUnits = await redis.get("units");

    if (cachedUnits) {
      console.log("Servindo do cache Redis");
      return res.status(200).json(JSON.parse(cachedUnits));
    }

    // se não houver chache, realiza a consulta incluindo o UnitType
    const result = await query(`
      SELECT 
        u.*, 
        ut."typeName" 
      FROM "Unit" u
      JOIN "UnitType" ut ON u."typeId" = ut."idType"
      WHERE u.available = true
    `);

    const units = result.rows;

    // Verifica se há unidades disponíveis
    if (!units || units.length === 0) {
      return res.status(404).json({ error: "Nenhuma unidade disponível" });
    }

    //armazenar no cache Redis por 10 minutos(600 segundos)
    await redis.set("units", JSON.stringify(units), { EX: 600 });

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");

    res.status(200).json(units);
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    res.status(500).json({ error: "Erro ao buscar unidades" });
  }
}
