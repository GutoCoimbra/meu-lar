import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Unit } from "../../../types"; // Ajuste o caminho conforme necessário

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data", "units.json");

  if (req.method === "GET") {
    try {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const units = JSON.parse(fileContents);

      res.status(200).json(units);
    } catch (error) {
      console.error("Failed to read units:", error);
      res.status(500).json({ message: "Failed to read units" });
    }
  } else if (req.method === "POST") {
    try {
      const newUnit: Unit = req.body; // Agora, o TypeScript sabe o que é 'Unit'
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const units: Unit[] = JSON.parse(fileContents);

      // Adicionando nova unidade
      units.push(newUnit);

      fs.writeFileSync(filePath, JSON.stringify(units, null, 2));

      res.status(201).json({ message: "Unit added successfully" });
    } catch (error) {
      console.error("Failed to add unit:", error);
      res.status(500).json({ message: "Failed to add unit" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
