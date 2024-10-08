import { useState, useEffect, useMemo } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useSession, signIn } from "next-auth/react";
import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { Unit } from "../types"; // Importando a interface Unit definida no arquivo types.ts

interface HomeProps {
  units: Unit[];
}

const Home: NextPage<HomeProps> = ({ units }) => {
  const { data: session, status } = useSession();
  const [filteredUnits, setFilteredUnits] = useState<Unit[]>(units);

  useEffect(() => {
    // Autenticação, se necessário
    // if (status === "unauthenticated") {
    //   signIn();
    // }
  }, [status]);

  const memoizedFilteredUnits = useMemo(() => filteredUnits, [filteredUnits]);

  const handleFilter = (filters: {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => {
    const filtered = units.filter((unit) => {
      const matchesFilter =
        (filters.state === "" || unit.state === filters.state) &&
        (filters.city === "" || unit.city === filters.city) &&
        (filters.neighborhood === "" ||
          unit.neighborhood === filters.neighborhood) &&
        (filters.address === "" || unit.address === filters.address);

      return matchesFilter;
    });

    setFilteredUnits(filtered);
  };

  if (status === "loading") {
    return <p className="text-center">Carregando...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
      {/* Limite de Largura aplicado ao Header */}
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>

      {/* Corpo principal da página */}
      <div className="flex-1 container mx-auto py-4 max-w-[1024px]">
        <Filter onFilter={handleFilter} units={units} />

        {/* Contêiner dos cards com limite de largura e centralização */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {memoizedFilteredUnits.length > 0 ? (
            memoizedFilteredUnits.map((unit, index) => (
              <Card key={`${unit.idUnitUUID}-${index}`} unit={unit} />
            ))
          ) : (
            <p className="text-center col-span-full">
              Nenhuma unidade encontrada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Função para buscar os dados do servidor
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const resUnits = await fetch(`${siteUrl}/api/unitsStatic`);
    if (!resUnits.ok) {
      throw new Error("Failed to fetch units");
    }
    let units: Unit[] | Unit = await resUnits.json();

    if (!Array.isArray(units)) {
      console.log("Units is not an array, converting to array");
      units = [units]; // Converte em array se for um objeto único
    }

    return {
      props: {
        units,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data in getServerSideProps:", error);
    return {
      props: {
        units: [],
      },
    };
  }
};

export default Home;
