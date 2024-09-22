import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ScheduleVisitForm from "@/components/ScheduleVisitForm";
import Link from "next/link";

interface Visit {
  idVisit: string;
  visit_date: string;
  unit_id: string;
  status_visit: string;
}

const MyVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [types, setTypes] = useState<{ [key: number]: string }>({});
  const [showCancelPopup, setShowCancelPopup] = useState<Visit | null>(null);
  const [showEditForm, setShowEditForm] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const fetchVisits = async () => {
    if (status === "unauthenticated") {
      return alert("Você precisa estar logado para ver seus agendamentos.");
    }

    if (!session?.user) {
      return;
    }

    const userId = session.user.id;

    const { data: visitData, error: visitError } = await supabase
      .from("visitSchedules")
      .select("idVisit, visit_date, unit_id, status_visit")
      .eq("uuidgoogle", userId)
      .in("status_visit", ["pendente", "confirmada"]);

    if (visitError) {
      console.error("Erro ao buscar visitas:", visitError.message);
    } else {
      setVisits(visitData as Visit[]);

      const unitIds = visitData.map((visit) => visit.unit_id);
      const unitsData = await fetchUnits(unitIds);
      setUnits(unitsData);

      const typesData = await fetchUnitTypes();
      setTypes(typesData);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [session, status]);

  const fetchUnits = async (unitIds: string[]) => {
    if (unitIds.length === 0) return [];

    const { data: unitsData, error: unitsError } = await supabase
      .from("Unit")
      .select("*")
      .in(
        "idUnit",
        unitIds.map((id) => parseInt(id))
      );

    if (unitsError) {
      console.error("Erro ao buscar unidades:", unitsError.message);
    }

    return unitsData || [];
  };

  const fetchUnitTypes = async () => {
    const { data: typesData, error: typesError } = await supabase
      .from("UnitType")
      .select("idType, typeName");

    if (typesError) {
      console.error("Erro ao buscar tipos de unidade:", typesError.message);
    }

    const typeMap = typesData?.reduce(
      (
        acc: { [key: number]: string },
        type: { idType: number; typeName: string }
      ) => {
        acc[type.idType] = type.typeName;
        return acc;
      },
      {}
    );

    return typeMap || {};
  };

  const handleCancelClick = (visit: Visit) => {
    setShowCancelPopup(visit);
  };

  const handleConfirmCancel = async () => {
    if (showCancelPopup) {
      setIsLoading(true);

      const { error } = await supabase
        .from("visitSchedules")
        .update({ status_visit: "cancelada" })
        .eq("idVisit", showCancelPopup.idVisit);

      if (!error) {
        setVisits(visits.filter((v) => v.idVisit !== showCancelPopup.idVisit));
      } else {
        console.error("Erro ao cancelar visita:", error.message);
      }

      setIsLoading(false);
      setShowCancelPopup(null);
    }
  };

  const handleEditClick = (visit: Visit) => {
    setShowEditForm(visit);
  };

  return (
    <div>
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>
      <div className="text-left mb-4">
        <Link href="/my-visits-realized">Visitas Realizadas</Link>
      </div>

      <h1 className="text-left mb-4">Minhas Visitas Agendadas</h1>
      {visits.length === 0 ? (
        <p>Nenhuma visita agendada.</p>
      ) : (
        visits.map((visit) => {
          const unit = units.find((u) => u.idUnit === parseInt(visit.unit_id));

          if (unit) {
            const unitWithType = {
              ...unit,
              typeName: unit.typeId
                ? types[unit.typeId]
                : "Tipo não especificado",
            };

            return (
              <div key={visit.idVisit} className="mb-4 text-left">
                <p>
                  Data da Visita: {new Date(visit.visit_date).toLocaleString()}
                </p>
                <p>Status: {visit.status_visit}</p>

                <Card unit={unitWithType} />

                <button
                  className="btn mt-2"
                  onClick={() => handleCancelClick(visit)}
                >
                  Cancelar Visita
                </button>
                <button
                  className="btn mt-2"
                  onClick={() => handleEditClick(visit)}
                >
                  Alterar Visita
                </button>
              </div>
            );
          } else {
            return <p key={visit.idVisit}>Carregando imóvel...</p>;
          }
        })
      )}

      {showCancelPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold">
              Deseja realmente cancelar a visita?
            </h2>
            <div className="flex justify-end mt-4">
              <button
                className="btn mr-2"
                onClick={() => setShowCancelPopup(null)}
              >
                Não
              </button>
              <button
                className="btn"
                onClick={handleConfirmCancel}
                disabled={isLoading}
              >
                {isLoading ? "Cancelando..." : "Sim"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ScheduleVisitForm
            unit_id={showEditForm.unit_id}
            visitId={showEditForm.idVisit}
            initialDate={showEditForm.visit_date}
            onClose={() => setShowEditForm(null)}
            onUpdate={fetchVisits}
          />
        </div>
      )}
    </div>
  );
};

export default MyVisits;
