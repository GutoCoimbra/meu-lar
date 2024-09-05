// pages/api/unitType/update.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { idType, typeName } = req.body;

      if (!idType || !typeName) {
        return res
          .status(400)
          .json({ error: "ID e nome do tipo de unidade são obrigatórios." });
      }

      const updatedUnitType = await prisma.unitType.update({
        where: { idType: Number(idType) },
        data: { typeName },
      });

      return res.status(200).json(updatedUnitType);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o tipo de unidade." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
