import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const units = await prisma.unit.findMany({
        where: { available: true },
        orderBy: { address: "desc" }, // Ajustado para o nome correto
      });
      return res.status(200).json(units);
    } catch (error) {
      console.error("Erro ao buscar imóveis no Prisma:", error);
      return res.status(500).json({ error: "Erro ao buscar imóveis" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
