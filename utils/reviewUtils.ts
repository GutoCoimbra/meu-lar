// utils/reviewUtils.ts

import { supabase } from "./supabase";

export const fetchAverageRating = async (
  idUnitUUID: string
): Promise<number> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("idUnitUUID", idUnitUUID);

  if (error) {
    console.error("Erro ao buscar avaliações:", error.message);
    return 0;
  }

  if (!data || data.length === 0) {
    return 0; // Retorna 0 se não houver avaliações
  }

  const totalRatings = data.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRatings / data.length;

  return parseFloat(averageRating.toFixed(1)); // Retorna a média com 1 casa decimal
};
