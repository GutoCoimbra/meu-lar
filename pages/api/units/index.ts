import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Caminho para o arquivo JSON com as unidades
      const filePath = path.join(process.cwd(), "data", "units.json");
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const units = JSON.parse(fileContents);

      // Retornar todas as unidades
      res.status(200).json(units);
    } catch (error) {
      console.error("Failed to read units:", error);
      res.status(500).json({ message: "Failed to read units" });
    }
  } else {
    // Método não permitido
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
