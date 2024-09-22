import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient";

interface ScheduleVisitFormProps {
  unit_id: string;
  visitId?: string;
  initialDate?: string;
  onClose: () => void;
  onUpdate?: (visitId?: string) => void;
}

const ScheduleVisitForm: React.FC<ScheduleVisitFormProps> = ({
  unit_id,
  initialDate = "",
  visitId,
  onClose,
  onUpdate,
}) => {
  const [visitDate, setVisitDate] = useState(initialDate);
  const [phone, setPhone] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchPhone = async () => {
      if (user) {
        const userId = user.id;
        const { data: userData, error } = await supabase
          .from("User")
          .select("phone")
          .eq("uuidgoogle", userId)
          .single();

        if (error) {
          console.error("Erro ao buscar telefone:", error);
        } else if (userData && userData.phone) {
          setPhone(userData.phone);
        }
      }
    };
    fetchPhone();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Você precisa estar logado para agendar uma visita.");
      return;
    }

    try {
      const userId = user.id;

      // Atualiza o telefone do usuário na tabela User
      const { error: userUpdateError } = await supabase
        .from("User")
        .update({ phone: parseInt(phone) })
        .eq("uuidgoogle", userId);

      if (userUpdateError) {
        throw userUpdateError;
      }

      // Verifica se estamos atualizando ou criando uma nova visita
      if (visitId) {
        const { error } = await supabase
          .from("visitSchedules")
          .update({
            visit_date: visitDate,
            status_visit: "pendente",
          })
          .eq("idVisit", visitId);

        if (error) {
          throw error;
        }
        alert("Visita alterada com sucesso.");
      } else {
        const { data, error } = await supabase
          .from("visitSchedules")
          .insert([
            {
              uuidgoogle: userId,
              unit_id: unit_id,
              visit_date: visitDate,
              status_visit: "pendente",
            },
          ])
          .select(); // Aqui adicionei o .select() para garantir que o retorno traga o novo id

        if (error) {
          throw error;
        }

        // Verificar o que realmente está vindo no retorno

        // Atualizar com o ID correto da resposta
        if (data && data.length > 0 && onUpdate) {
          const newVisitId = data[0].idVisit || data[0].id; // Ajustar de acordo com o campo correto retornado
          onUpdate(newVisitId);
        }

        alert("Visita agendada com sucesso!");
      }

      onClose(); // Fecha o modal após a operação bem-sucedida
    } catch (error) {
      console.error("Erro ao agendar/atualizar visita:", error);
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg max-w-lg w-full">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-4">
        {visitId ? "Alterar Visita" : "Agendar Visita"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Data da Visita:
          <input
            type="datetime-local"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <label className="block mb-2">
          Telefone para Contato:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2 w-full mt-1 rounded"
            placeholder="Digite seu telefone"
          />
        </label>

        <button type="submit" className="btn w-full mt-4">
          {visitId ? "Alterar Visita" : "Agendar Visita"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleVisitForm;
