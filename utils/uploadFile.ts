// utils/uploadFile.ts
import { supabase } from "./supabaseClient";

export const uploadFileToFolder = async (file: File, folder: string) => {
  const fileName = `${folder}/${file.name}`;

  // Faz o upload do arquivo para a pasta correta dentro do bucket 'documents'
  const { data, error } = await supabase.storage
    .from("documents") // Nome do bucket
    .upload(fileName, file);

  if (error) {
    console.error("Erro ao fazer upload do arquivo:", error.message);
    return null;
  }

  // Verifica e obtém a URL pública do arquivo que foi feito o upload
  const { data: publicUrlData } = supabase.storage
    .from("documents")
    .getPublicUrl(fileName);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    console.error("Erro ao obter a URL pública");
    return null;
  }

  return publicUrlData.publicUrl; // Retorna a URL pública
};
