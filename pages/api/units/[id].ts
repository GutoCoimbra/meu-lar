import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Unit } from "../../../types"; // Ajuste o caminho conforme necessário

const unitsFilePath = path.join(process.cwd(), "data", "units.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Verificar se o ID é fornecido e convertê-lo para número
  if (!id || Array.isArray(id)) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  const numericId = Number(id);

  if (isNaN(numericId)) {
    res.status(400).json({ message: "Invalid ID format" });
    return;
  }

  try {
    // Ler o arquivo JSON
    const fileContents = fs.readFileSync(unitsFilePath, "utf-8");
    const units: Unit[] = JSON.parse(fileContents);

    // Encontrar a unidade específica pelo ID
    const unitIndex = units.findIndex((u) => u.idUnit === numericId);

    if (unitIndex === -1) {
      res.status(404).json({ message: "Unit not found" });
      return;
    }

    if (req.method === "GET") {
      // Retornar a unidade encontrada
      res.status(200).json(units[unitIndex]);
    } else if (req.method === "PUT") {
      // Atualizar a unidade
      const updatedUnit: Unit = req.body;
      units[unitIndex] = updatedUnit;

      // Salvar o arquivo JSON atualizado
      fs.writeFileSync(unitsFilePath, JSON.stringify(units, null, 2));

      res.status(200).json(updatedUnit);
    } else {
      // Método não permitido
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Failed to handle request:", error);
    res.status(500).json({ message: "Failed to handle request" });
  }
}
