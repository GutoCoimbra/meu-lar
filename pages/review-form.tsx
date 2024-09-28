import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useSession } from "next-auth/react";
import Card from "../components/Card";
import ReviewForm from "../components/ReviewForm";
import { Unit } from "@/types";
import Header from "@/components/Header";

const ReviewFormPage = () => {
  const [visitedUnits, setVisitedUnits] = useState<Unit[]>([]);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch units with "status_visit" = 'realizada' and exclude units already reviewed
  useEffect(() => {
    const fetchVisitedUnits = async () => {
      if (!userId) return;

      // Query to get all unit_ids with 'realizada' status
      const { data: visitsData, error: visitsError } = await supabase
        .from("visitschedules")
        .select("idUnitUUID")
        .eq("uuidgoogle", userId)
        .eq("status_visit", "realizada");

      if (visitsError) {
        console.error("Error fetching visit schedules:", visitsError.message);
        return;
      }

      if (visitsData && visitsData.length > 0) {
        const unitIds = visitsData.map((visit) => visit.idUnitUUID);

        // Fetch reviews to exclude units already reviewed
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("idUnitUUID")
          .eq("uuidgoogle", userId);

        if (reviewsError) {
          console.error("Error fetching reviews:", reviewsError.message);
          return;
        }

        const reviewedUnitIds = reviewsData.map((review) => review.idUnitUUID);

        // Filter out the units that have already been reviewed
        const unitsToReviewIds = unitIds.filter(
          (id) => !reviewedUnitIds.includes(id)
        );

        // Fetch unit details based on the filtered unit_ids
        if (unitsToReviewIds.length > 0) {
          const { data: unitsData, error: unitsError } = await supabase
            .from("Unit")
            .select("*")
            .in("idUnitUUID", unitsToReviewIds);

          if (unitsError) {
            console.error("Error fetching units:", unitsError.message);
          } else {
            setVisitedUnits(unitsData);
          }
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

  const handleReviewSubmit = (idUnitUUID: string) => {
    // Remove the unit from the list after review is submitted
    setVisitedUnits(
      (prevUnits) => prevUnits.filter((unit) => unit.idUnitUUID !== idUnitUUID) // Converte unit.idUnit para string
    );
  };

  return (
    <div>
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>
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
              idUnitUUID={unit.idUnitUUID.toString()} // Converter para string
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
