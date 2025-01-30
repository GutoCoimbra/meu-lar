import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { idUnitUUID, isFavorited } = req.body;

  if (!idUnitUUID) {
    return res.status(400).json({ error: "O campo idUnitUUID é obrigatório" });
  }

  try {
    if (isFavorited) {
      // Remover dos favoritos
      await query(`DELETE FROM "Favorite" WHERE idUnitUUID = $1`, [idUnitUUID]);
    } else {
      // Adicionar aos favoritos
      await query(
        `INSERT INTO "Favorite" (idUnitUUID, createdAt) VALUES ($1, NOW())`,
        [idUnitUUID]
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    res.status(500).json({ error: "Erro ao alternar favorito" });
  }
}
