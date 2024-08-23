// pages/api/renters.ts
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { parseForm } from "../../utils/parseForm"; // Importa a função parseForm

export const config = {
  api: {
    bodyParser: false, // Desabilita o bodyParser para essa rota específica
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    // Processar os dados e arquivos enviados
    const { fields, files } = await parseForm(req);

    const {
      nomeCompleto,
      identidade,
      orgaoExpedidor,
      cpf,
      endereco,
      nacionalidade,
      estadoCivil,
      dataNascimento,
      renda,
    } = fields;

    const locatarioId = uuidv4();
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      locatarioId
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const salvarArquivo = (arquivo: any, nome: string) => {
      const filePath = path.join(uploadDir, nome);
      fs.writeFileSync(filePath, fs.readFileSync(arquivo.filepath));
      return `/uploads/${locatarioId}/${nome}`;
    };

    const identidadePath = salvarArquivo(
      files.identidadeArquivo,
      "identidade.pdf"
    );
    const cpfPath = salvarArquivo(files.cpfArquivo, "cpf.pdf");
    const rendaPath = salvarArquivo(files.rendaArquivo, "renda.pdf");
    const residenciaPath = salvarArquivo(
      files.residenciaArquivo,
      "residencia.pdf"
    );

    // Salve os dados no banco de dados aqui
    res.status(200).json({ message: "Locatário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar locatário:", error);
    res.status(500).json({ message: "Erro ao processar o cadastro" });
  }
};

export default handler;
