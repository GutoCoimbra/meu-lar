// pages/api/unitType.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Alterar o nome da tabela para "UnitType"
    const result = await query('SELECT * FROM "UnitType"');
    const types = result.rows;
    res.status(200).json(types);
  } catch (error) {
    console.error("Erro ao buscar tipos de unidades:", error);
    res.status(500).json({ error: "Erro ao buscar tipos de unidades" });
  }
}
