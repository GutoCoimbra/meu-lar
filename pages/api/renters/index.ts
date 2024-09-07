// pages/api/renters/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const renterData = {
        ...req.body,
        cpfRenter: BigInt(req.body.cpfRenter),
        idtRenter: BigInt(req.body.idtRenter),
        birthdateRenter: new Date(req.body.birthdateRenter),
        admissionDataRenter: new Date(req.body.admissionDataRenter),
      };

      const newRenter = await prisma.renter.create({
        data: renterData,
      });

      res.status(201).json(newRenter);
    } catch (error) {
      console.error("Erro ao adicionar locatário:", error);
      res.status(500).json({ error: "Erro ao adicionar locatário" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
