import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSession } from "next-auth/react";
import Card from "../components/Card";
import ReviewForm from "../components/ReviewForm";
import { Unit } from "@/types";

const ReviewFormPage = () => {
  const [visitedUnits, setVisitedUnits] = useState<Unit[]>([]);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch units with "status_visit" = 'realizada'
  useEffect(() => {
    const fetchVisitedUnits = async () => {
      if (!userId) return;

      // Query to get all unit_ids with 'realizada' status
      const { data: visitsData, error: visitsError } = await supabase
        .from("visitSchedules")
        .select("unit_id")
        .eq("uuidgoogle", userId)
        .eq("status_visit", "realizada");

      if (visitsError) {
        console.error("Error fetching visit schedules:", visitsError.message);
        return;
      }

      if (visitsData && visitsData.length > 0) {
        const unitIds = visitsData.map((visit) => visit.unit_id);

        // Fetch unit details based on unit_ids
        const { data: unitsData, error: unitsError } = await supabase
          .from("Unit")
          .select("*")
          .in("idUnit", unitIds);

        if (unitsError) {
          console.error("Error fetching units:", unitsError.message);
        } else {
          setVisitedUnits(unitsData);
        }
      }
    };

    if (userId) {
      fetchVisitedUnits();
    }
  }, [userId]);

  // Get the user ID from the session
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleReviewSubmit = (unitId: string) => {
    // Remove the unit from the list after review is submitted
    setVisitedUnits(
      (prevUnits) => prevUnits.filter((unit) => unit.idUnitUUID !== unitId) // Converte unit.idUnit para string
    );
  };

  return (
    <div>
      <h1>Avaliar Imóveis Visitados</h1>
      {visitedUnits.length === 0 ? (
        <p>Nenhuma avaliação pendente.</p>
      ) : (
        visitedUnits.map((unit) => (
          <div key={unit.idUnitUUID}>
            <Card
              key={unit.idUnitUUID}
              unit={unit}
              unitId={unit.idUnitUUID} // Converter para string
              userId={userId}
              onReviewSubmit={() =>
                handleReviewSubmit(unit.idUnitUUID.toString())
              }
            />
            <ReviewForm
              unitId={unit.idUnitUUID.toString()} // Converter para string
              userId={userId!}
              onReviewSubmit={() =>
                handleReviewSubmit(unit.idUnitUUID.toString())
              } // Converter para string
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewFormPage;
