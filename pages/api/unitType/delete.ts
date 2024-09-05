// pages/api/unitType/delete.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verifica se o método HTTP é DELETE
    if (req.method === "DELETE") {
      const { idType } = req.body; // Obtém o idType do corpo da solicitação

      // Verifica se o idType foi fornecido
      if (!idType) {
        return res
          .status(400)
          .json({ error: "ID do tipo de unidade não fornecido." });
      }

      // Converte idType para número e exclui o registro correspondente
      const deletedUnitType = await prisma.unitType.delete({
        where: { idType: Number(idType) },
      });

      // Retorna a resposta de sucesso
      return res.status(200).json(deletedUnitType);
    } else {
      // Define o cabeçalho Allow com os métodos permitidos e retorna erro 405
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error); // Loga o erro no console do servidor
    res.status(500).json({ error: "Erro ao excluir o tipo de unidade." }); // Retorna erro 500 com mensagem de erro
  }
}
