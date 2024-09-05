// pages/api/unitType/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Buscar todos os tipos de unidade
      const unitTypes = await prisma.unitType.findMany();
      res.status(200).json(unitTypes);
    } else if (req.method === "POST") {
      // Criar um novo tipo de unidade
      const { typeName } = req.body;
      const newUnitType = await prisma.unitType.create({
        data: { typeName },
      });
      res.status(201).json(newUnitType);
    } else if (req.method === "PUT") {
      // Atualizar um tipo de unidade existente
      const { idType, typeName } = req.body;
      if (!idType || !typeName) {
        return res
          .status(400)
          .json({ error: "ID e Nome do Tipo de Unidade são necessários." });
      }
      const updatedUnitType = await prisma.unitType.update({
        where: { idType: Number(idType) },
        data: { typeName },
      });
      res.status(200).json(updatedUnitType);
    } else if (req.method === "DELETE") {
      // Deletar um tipo de unidade
      const { idType } = req.body;
      if (!idType) {
        return res
          .status(400)
          .json({ error: "ID do tipo de unidade não fornecido." });
      }
      await prisma.unitType.delete({
        where: { idType: Number(idType) },
      });
      res.status(204).end();
    } else {
      // Retornar erro para métodos não permitidos
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
}
