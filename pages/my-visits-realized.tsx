// pages/my-visits-realized.tsx
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabaseClient";
import Header from "@/components/Header";
import Card from "@/components/Card";

interface Visit {
  idVisit: string;
  visit_date: string;
  unit_id: string;
  status_visit: string;
}

const MyVisitsRealized = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
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
        .eq("status_visit", "realizada"); // Filtrar visitas com status "realizada"

      if (visitError) {
        console.error("Erro ao buscar visitas:", visitError.message);
      } else {
        setVisits(visitData as Visit[]);

        const unitIds = visitData.map((visit) => visit.unit_id);
        const unitsData = await fetchUnits(unitIds);
        setUnits(unitsData);
      }
    };

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

  return (
    <div>
      <Header />
      <h1 className="text-left mb-4">Visitas Realizadas</h1>
      {visits.length === 0 ? (
        <p>Nenhuma visita realizada.</p>
      ) : (
        visits.map((visit) => {
          const unit = units.find((u) => u.idUnit === parseInt(visit.unit_id));

          return (
            <div key={visit.idVisit} className="mb-4 text-left">
              <p>
                Data da Visita: {new Date(visit.visit_date).toLocaleString()}
              </p>
              <p>Status: {visit.status_visit}</p>

              {unit ? <Card unit={unit} /> : <p>Carregando imóvel...</p>}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyVisitsRealized;
