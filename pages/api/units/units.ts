import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handler para a rota API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    case "PUT":
      return handlePUT(req, res);
    case "DELETE":
      return handleDELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}

// Método GET: Obter todas as unidades
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const units = await prisma.unit.findMany();
    res.status(200).json(units);
  } catch (error) {
    console.error("Erro ao obter unidades:", error);
    res.status(500).json({ error: "Erro ao obter unidades." });
  }
}

// Método POST: Criar uma nova unidade
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newUnit = await prisma.unit.create({
      data: req.body,
    });
    res.status(201).json(newUnit);
  } catch (error) {
    console.error("Erro ao criar unidade:", error);
    res.status(500).json({ error: "Erro ao criar unidade." });
  }
}

// Método PUT: Atualizar uma unidade existente
async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  const { idUnit, ...data } = req.body;
  try {
    const updatedUnit = await prisma.unit.update({
      where: { idUnit: Number(idUnit) },
      data,
    });
    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error("Erro ao atualizar unidade:", error);
    res.status(500).json({ error: "Erro ao atualizar unidade." });
  }
}

// Método DELETE: Deletar uma unidade existente
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  const { idUnit } = req.body;
  try {
    await prisma.unit.delete({
      where: { idUnit: Number(idUnit) },
    });
    res.status(204).end(); // Sucesso, mas sem conteúdo para retornar
  } catch (error) {
    console.error("Erro ao deletar unidade:", error);
    res.status(500).json({ error: "Erro ao deletar unidade." });
  }
}
