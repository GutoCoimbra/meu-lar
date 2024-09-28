import { supabase } from "../../../utils/supabase"; // Importe a configuração do Supabase

const addToFavorites = async (idRenter: number, idUnit: number) => {
  const { data, error } = await supabase
    .from("Favorite")
    .insert([{ idRenter, idUnit }]);

  if (error) {
    console.error("Erro ao favoritar o imóvel:", error);
    return { success: false, error };
  } else {
    console.log("Imóvel favoritado com sucesso:", data);
    return { success: true, data };
  }
};

const removeFromFavorites = async (idRenter: number, idUnit: number) => {
  const { data, error } = await supabase
    .from("Favorite")
    .delete()
    .match({ idRenter, idUnit });

  if (error) {
    console.error("Erro ao desfavoritar o imóvel:", error);
    return { success: false, error };
  } else {
    console.log("Imóvel removido dos favoritos:", data);
    return { success: true, data };
  }
};
