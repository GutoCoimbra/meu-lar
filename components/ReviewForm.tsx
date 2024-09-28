import { useState } from "react";
import { supabase } from "../utils/supabase";

interface ReviewFormProps {
  idUnitUUID: string;
  userId: string;
  onReviewSubmit: () => void; // Callback para atualizar após o envio da avaliação
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  idUnitUUID,
  userId,
  onReviewSubmit,
}) => {
  const [rating, setRating] = useState<number>(0); // Inicializa com 0
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o rating está entre 1 e 10
    if (rating < 1 || rating > 10) {
      alert("Por favor, insira uma nota válida entre 1 e 10.");
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        idUnitUUID: idUnitUUID,
        uuidgoogle: userId,
        rating,
        comment,
      },
    ]);

    if (error) {
      console.error("Erro ao enviar avaliação:", error.message);
    } else {
      alert("Avaliação enviada com sucesso!");
      onReviewSubmit(); // Atualiza a lista após o envio
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md w-full mt-4"
    >
      <label className="block mb-2">
        Avaliação (Nota de 1 a 10):
        <input
          type="number"
          min="1"
          max="10"
          value={rating} // Agora o valor é sempre numérico
          onChange={(e) => setRating(parseInt(e.target.value))} // Garante que sempre seja um número
          required
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Comentário:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Deixe um comentário"
          rows={3}
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Enviar Avaliação
      </button>
    </form>
  );
};

export default ReviewForm;
