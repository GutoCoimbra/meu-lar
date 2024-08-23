// utils/parseForm.ts
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false, // Desabilitar o bodyParser padrão do Next.js
  },
};

export const parseForm = (
  req: NextApiRequest
): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
