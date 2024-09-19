import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Usar next-auth para a sessão
import { supabase } from "../utils/supabaseClient";

interface ScheduleVisitFormProps {
  unit_id: string;
  initialDate?: string; // Agora aceita a data inicial opcional
  onClose: () => void; // Função para fechar o modal
}

const ScheduleVisitForm: React.FC<ScheduleVisitFormProps> = ({
  unit_id,
  initialDate = "", // Usa a data inicial se fornecida, caso contrário, inicia com uma string vazia
  onClose,
}) => {
  const [visitDate, setVisitDate] = useState(initialDate); // Inicia com a data passada ou uma string vazia
  const [phone, setPhone] = useState(""); // Estado para o telefone
  const { data: session } = useSession(); // Sessão do next-auth
  const user = session?.user;

  // Efeito para buscar o telefone do usuário quando o componente for montado
  useEffect(() => {
    const fetchPhone = async () => {
      if (user) {
        const userId = user.id; // Pega o ID do usuário da sessão

        // Faz uma consulta para obter o telefone do usuário
        const { data: userData, error } = await supabase
          .from("User")
          .select("phone")
          .eq("uuidgoogle", userId)
          .single(); // Garante que trará apenas um resultado

        if (error) {
          console.error("Erro ao buscar telefone:", error);
        } else if (userData && userData.phone) {
          setPhone(userData.phone); // Preenche o campo de telefone com o valor do banco
        }
      }
    };

    fetchPhone();
  }, [user]); // Executa o efeito quando o usuário estiver disponível

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Você precisa estar logado para agendar uma visita.");
      return;
    }

    try {
      const userId = user.id; // ID do usuário

      // Atualiza o telefone do usuário na tabela User
      const { error: userUpdateError } = await supabase
        .from("User")
        .update({ phone: parseInt(phone) })
        .eq("uuidgoogle", userId);

      if (userUpdateError) {
        throw userUpdateError;
      }

      // Insere o agendamento no Supabase
      const { data, error } = await supabase.from("visitSchedules").insert([
        {
          uuidgoogle: userId, // Usar o ID do usuário
          unit_id: unit_id,
          visit_date: visitDate,
          status_visit: "pendente", // Status inicial
        },
      ]);

      if (error) {
        throw error;
      }

      alert("Visita agendada com sucesso!");
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao agendar visita:", error);
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
      <h2 className="text-lg font-bold mb-4">Agendar Visita</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Data da Visita:
          <input
            type="datetime-local" // Tipo ajustado para incluir hora
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
          Agendar Visita
        </button>
      </form>
    </div>
  );
};

export default ScheduleVisitForm;
