import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Certifique-se de que o caminho para prisma está correto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Buscar todas as características
      const features = await prisma.feature.findMany();
      res.status(200).json(features);
    } else if (req.method === "PUT") {
      // Alterar uma característica existente
      const { id, name } = req.body;

      if (!id || !name) {
        return res
          .status(400)
          .json({
            error:
              "ID e Nome são obrigatórios para atualizar uma característica.",
          });
      }

      const updatedFeature = await prisma.feature.update({
        where: { id: Number(id) },
        data: { name },
      });

      res.status(200).json(updatedFeature);
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Erro ao atualizar a característica:", error);
    res.status(500).json({ error: "Erro ao atualizar a característica." });
  }
}
