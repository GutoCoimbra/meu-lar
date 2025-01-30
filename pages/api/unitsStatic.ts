// api/unitsStatic.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db";
import redis from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const limit = 2;
  const offset = parseInt(req.query.offset as string, 10) || 0;

  try {
    const cachedUnits = await redis.get(`units-${limit}-${offset}`);
    let units = [];
    let totalUnits = 0;

    if (cachedUnits) {
      units = JSON.parse(cachedUnits);
    } else {
      const result = await query(
        `
        SELECT u."idUnitUUID", u."unitNumber", u."address", u."neighborhood", 
               u."city", u."state", u."squareMeter", u."rooms", u."garage", 
               u."rentValue", u."condominium", u."waterTax", u."electricityTax", 
               u."internetTax", u."maintenanceFee", u."imgUrl", ut."typeName" 
        FROM "Unit" u
        JOIN "UnitType" ut ON u."typeId" = ut."idType"
        LIMIT $1 OFFSET $2
      `,
        [limit, offset]
      );

      units = result.rows;

      const totalResult = await query(`SELECT COUNT(*) FROM "Unit"`);
      totalUnits = parseInt(totalResult.rows[0].count, 10);

      await redis.set(`units-${limit}-${offset}`, JSON.stringify(units), {
        EX: 600,
      });
    }

    res.status(200).json({ units, totalUnits });
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    res.status(500).json({ units: [], totalUnits: 0 });
  }
}
