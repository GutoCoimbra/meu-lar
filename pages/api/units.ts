// pages/api/units.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Realizar a consulta incluindo o UnitType
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

    // Retorna os dados das unidades com o nome do tipo de unidade
    res.status(200).json(units);
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    res.status(500).json({ error: "Erro ao buscar unidades" });
  }
}
