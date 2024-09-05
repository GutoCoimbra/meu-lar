// pages/api/features/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Certifique-se de que o caminho para prisma está correto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Nome é obrigatório." });
      }

      const newFeature = await prisma.feature.create({
        data: { name },
      });

      res.status(201).json(newFeature);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Erro ao criar a característica:", error);
    res.status(500).json({ error: "Erro ao criar a característica." });
  }
}
