// pages/api/units.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query("SELECT * FROM units WHERE available = true");
    const units = result.rows;
    res.status(200).json(units);
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    res.status(500).json({ error: "Erro ao buscar unidades" });
  }
}
