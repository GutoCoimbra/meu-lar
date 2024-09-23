import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Header from "@/components/Header";
import { Unit, Visit as VisitType } from "@/types"; // Importando as interfaces do types.ts
import Card from "@/components/Card"; // Importa o componente de card já existente

const AdminVisits = () => {
  const [visits, setVisits] = useState<VisitType[]>([]); // Usando a interface VisitType
  const [units, setUnits] = useState<Unit[]>([]); // Armazenar as unidades relacionadas às visitas
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<VisitType | null>(null);

  useEffect(() => {
    const fetchVisitsAndUnits = async () => {
      // Busca as visitas que não estão canceladas ou realizadas
      const { data: visitsData, error: visitsError } = await supabase
        .from("visitschedules")
        .select("*")
        .not("status_visit", "eq", "cancelada")
        .not("status_visit", "eq", "rejeitada")
        .not("status_visit", "eq", "realizada");

      if (visitsError) {
        console.error("Erro ao buscar visitas:", visitsError.message);
        return;
      }

      setVisits(visitsData);

      // Agora buscamos as unidades relacionadas às visitas
      const unitIds = visitsData.map((visit: VisitType) => visit.idUnitUUID);
      const { data: unitsData, error: unitsError } = await supabase
        .from("Unit")
        .select("*")
        .in("idUnitUUID", unitIds);

      if (unitsError) {
        console.error("Erro ao buscar unidades:", unitsError.message);
        return;
      }

      setUnits(unitsData);
    };

    fetchVisitsAndUnits();
  }, []);

  const handleConfirmClick = async (visitId: string) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("visitschedules")
      .update({ status_visit: "confirmada" })
      .eq("idVisit", visitId);

    if (error) {
      console.error("Erro ao confirmar visita:", error.message);
    } else {
      setVisits(
        visits.map((v) =>
          v.idVisit === visitId ? { ...v, status_visit: "confirmada" } : v
        )
      );
    }
    setIsLoading(false);
  };

  const handleRejectClick = (visit: VisitType) => {
    setSelectedVisit(visit); // Abre o campo para rejeitar
  };

  const handleRejectSubmit = async () => {
    if (selectedVisit) {
      setIsLoading(true);
      const { error } = await supabase
        .from("visitschedules")
        .update({
          status_visit: "rejeitada",
          rejection_reason: rejectionReason, // Salva o motivo da rejeição
        })
        .eq("idVisit", selectedVisit.idVisit);

      if (error) {
        console.error("Erro ao rejeitar visita:", error.message);
      } else {
        setVisits(
          visits.map((v) =>
            v.idVisit === selectedVisit.idVisit
              ? {
                  ...v,
                  status_visit: "rejeitada",
                  rejection_reason: rejectionReason,
                }
              : v
          )
        );
        setSelectedVisit(null);
        setRejectionReason("");
      }
      setIsLoading(false);
    }
  };

  const handleRealizedClick = async (visitId: string) => {
    setIsLoading(true);
    const { error } = await supabase
      .from("visitschedules")
      .update({ status_visit: "realizada" })
      .eq("idVisit", visitId);

    if (error) {
      console.error("Erro ao marcar visita como realizada:", error.message);
    } else {
      setVisits(
        visits.map((v) =>
          v.idVisit === visitId ? { ...v, status_visit: "realizada" } : v
        )
      );
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>
      <h1>Administração de Visitas Agendadas</h1>
      {visits.length === 0 ? (
        <p>Nenhuma visita agendada.</p>
      ) : (
        visits.map((visit) => {
          const unit = units.find(
            (unit) => unit.idUnitUUID === visit.idUnitUUID
          );
          return (
            <div key={visit.idVisit} className="mb-4 border p-4">
              {unit && <Card unit={unit} />} {/* Renderiza o card da unidade */}
              <p>
                Data da Visita: {new Date(visit.visit_date).toLocaleString()}
              </p>
              <p>Status: {visit.status_visit}</p>
              {visit.status_visit === "pendente" && (
                <div>
                  <button
                    onClick={() => handleConfirmClick(visit.idVisit)}
                    disabled={isLoading}
                    className="btn mr-2"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => handleRejectClick(visit)}
                    disabled={isLoading}
                    className="btn mr-2"
                  >
                    Rejeitar
                  </button>
                </div>
              )}
              {visit.status_visit === "confirmada" && (
                <button
                  onClick={() => handleRealizedClick(visit.idVisit)}
                  disabled={isLoading}
                  className="btn"
                >
                  Marcar como Realizada
                </button>
              )}
              {visit.status_visit === "realizada" && (
                <p>Visita marcada como realizada.</p>
              )}
            </div>
          );
        })
      )}

      {selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold">Informe o motivo da rejeição</h2>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mt-2"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedVisit(null)}
                className="btn mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={isLoading}
                className="btn"
              >
                {isLoading ? "Rejeitando..." : "Confirmar Rejeição"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVisits;
