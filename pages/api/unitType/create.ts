// pages/api/unitType/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { typeName } = req.body;

      if (!typeName) {
        return res
          .status(400)
          .json({ error: "Nome do tipo de unidade é obrigatório." });
      }

      const newUnitType = await prisma.unitType.create({
        data: { typeName },
      });

      return res.status(201).json(newUnitType);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao criar o tipo de unidade." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
