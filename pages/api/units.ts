// pages/api/units.ts
import type { NextApiRequest, NextApiResponse } from "next";
import units from "../../data/units.json"; // Caminho correto para o arquivo JSON

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(units);
}
