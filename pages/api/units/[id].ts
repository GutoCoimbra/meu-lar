import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    // Ajustar a consulta SQL para referenciar a coluna corretamente
    const result = await query('SELECT * FROM "Unit" WHERE "idUnit" = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unidade não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar unidade:", error);
    res.status(500).json({ error: "Erro ao buscar unidade" });
  }
}
