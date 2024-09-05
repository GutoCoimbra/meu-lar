import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Certifique-se de que o caminho para prisma está correto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID é obrigatório para excluir uma característica." });
      }

      await prisma.feature.delete({
        where: { id: Number(id) },
      });

      res.status(204).end(); // Retorna 204 No Content para uma exclusão bem-sucedida
    } else {
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Erro ao excluir a característica:", error);
    res.status(500).json({ error: "Erro ao excluir a característica." });
  }
}
