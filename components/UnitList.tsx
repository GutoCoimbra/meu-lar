import { useEffect, useState } from "react";

interface Unit {
  unitnumber: number;
}

export default function UnitList() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnits() {
      try {
        const response = await fetch("/api/units");
        const data = await response.json();
        setUnits(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  if (loading) return <p>Carregando imóveis...</p>;

  return (
    <div>
      <h1>Imóveis Disponíveis</h1>
      <ul>
        {units.map((unit) => (
          <li key={unit.unitnumber}>
            <h2>{unit.unitnumber}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
