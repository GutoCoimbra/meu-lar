import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db";
import redis from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verificar se os dados estáticos estão no cache do Redis
    const cachedProperties = await redis.get("units");
    let properties;

    if (cachedProperties) {
      console.log("Servindo dados básicos do cache Redis");
      properties = JSON.parse(cachedProperties);
    } else {
      // Buscar os dados estáticos do banco de dados
      const result = await query(`
        SELECT 
          u."idUnitUUID", 
          u."unitNumber", 
          u."address", 
          u."neighborhood", 
          u."city", 
          u."state", 
          u."squareMeter", 
          u."rooms", 
          u."garage", 
          u."rentValue", 
          u."condominium", 
          u."waterTax", 
          u."electricityTax", 
          u."internetTax", 
          u."maintenanceFee",
          u."imgUrl",
          ut."typeName" 
        FROM "Unit" u
        JOIN "UnitType" ut ON u."typeId" = ut."idType"
      `);

      properties = result.rows;

      if (!properties || properties.length === 0) {
        return res.status(404).json({ error: "Nenhum imóvel encontrado" });
      }

      // Armazenar os dados estáticos no cache do Redis por 1 dia
      await redis.set("units", JSON.stringify(properties), { EX: 86400 });
    }

    // Agora vamos verificar se o cache do status "available" já está armazenado no Redis
    const cachedAvailableStatuses = await redis.get("availableStatuses");

    let availabilityMap;

    if (cachedAvailableStatuses) {
      console.log("Servindo status de disponibilidade do cache Redis");
      availabilityMap = new Map(JSON.parse(cachedAvailableStatuses));
    } else {
      // Caso não esteja no cache, consultar o status "available" diretamente do banco de dados
      const availableStatuses = await query(`
        SELECT u."idUnitUUID", u."available" 
        FROM "Unit" u
      `);

      availabilityMap = new Map(
        availableStatuses.rows.map(
          (row: { idUnitUUID: string; available: boolean }) => [
            row.idUnitUUID,
            row.available,
          ]
        )
      );

      // Armazenar o status "available" no Redis com expiração de 10 minutos (600 segundos)
      await redis.set(
        "availableStatuses",
        JSON.stringify(Array.from(availabilityMap)),
        { EX: 600 }
      );
    }

    // Atualizar os dados estáticos com o status "available" atualizado
    const updatedProperties = properties.map((property: any) => ({
      ...property,
      available: availabilityMap.get(property.idUnitUUID) || false, // Atualiza o status "available"
    }));

    // Retorna os dados combinados (dados estáticos + status "available" atualizado)
    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
    return res.status(200).json(updatedProperties);
  } catch (error) {
    console.error("Erro ao buscar dados dos imóveis:", error);
    return res.status(500).json({ error: "Erro ao buscar dados dos imóveis" });
  }
}
