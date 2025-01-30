import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query('SELECT * FROM "Unit" LIMIT 10');
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    res.status(500).json({ error: "Erro ao acessar o banco de dados" });
  }
}
