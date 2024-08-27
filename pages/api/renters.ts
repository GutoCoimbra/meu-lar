import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Caminho para o arquivo renters.json
const rentersFilePath = path.join(process.cwd(), "data/renters.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Lê o conteúdo atual do arquivo renters.json
    fs.readFile(rentersFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading renters.json:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      // Converte o conteúdo para um array de objetos
      const renters = data ? JSON.parse(data) : [];

      // Adiciona o novo locatário ao array
      const newRenter = req.body;
      renters.push(newRenter);

      // Grava o array atualizado de volta no arquivo renters.json
      fs.writeFile(rentersFilePath, JSON.stringify(renters, null, 2), (err) => {
        if (err) {
          console.error("Error writing to renters.json:", err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        res.status(200).json({ message: "Renter added successfully" });
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
