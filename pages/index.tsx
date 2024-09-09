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

  // Evitar navegação desnecessária
  useEffect(() => {
    // if (status === "unauthenticated") {
    //   signIn();
    // }
  }, [status]);

  // Memorize the filtered units to avoid unnecessary re-renders
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
      <Header />

      <div className="flex-1 container mx-auto px-4 py-4 max-w-[1024px]">
        <Filter onFilter={handleFilter} units={units} />

        {/* Contêiner dos cards com limite de largura e centralização */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {memoizedFilteredUnits.length > 0 ? (
            memoizedFilteredUnits.map((unit, index) => (
              <Card
                key={`${unit.idUnit}-${index}`}
                idUnit={unit.idUnit}
                address={unit.address}
                neighborhood={unit.neighborhood}
                city={unit.city}
                state={unit.state}
                unitNumber={unit.unitNumber}
                typeName={unit.typeName} // Passando o nome do tipo para o componente
                rentValue={unit.rentValue}
                condominium={unit.condominium}
                waterTax={unit.waterTax}
                electricityTax={unit.electricityTax}
                internetTax={unit.internetTax}
                squareMeter={unit.squareMeter}
                rooms={unit.rooms}
                garage={unit.garage}
                averageRating={unit.averageRating}
                imgUrl={unit.imgUrl} // Adicionando imgUrl aqui
              />
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
    // Usar a variável de ambiente para a URL do site
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Buscar unidades através da API
    const resUnits = await fetch(`${siteUrl}/api/units`);
    if (!resUnits.ok) {
      throw new Error("Failed to fetch units");
    }
    const units: Unit[] = await resUnits.json();

    // Se a resposta de unidades estiver vazia, retorne um array vazio
    if (!units || units.length === 0) {
      return { props: { units: [] } };
    }

    // Buscar tipos através da API
    const resTypes = await fetch(`${siteUrl}/api/unitType`);
    if (!resTypes.ok) {
      throw new Error("Failed to fetch types");
    }
    const types = await resTypes.json();

    // Mapeia os tipos para facilitar o acesso pelo ID
    const typeMap = types.reduce(
      (
        acc: { [key: number]: string },
        type: { idType: number; typeName: string }
      ) => {
        acc[type.idType] = type.typeName;
        return acc;
      },
      {}
    );

    // Adiciona o nome do tipo ao objeto unit
    const availableUnits = units
      .filter((unit) => unit.available === true)
      .map((unit) => ({
        ...unit,
        typeName: unit.typeId ? typeMap[unit.typeId] : "Tipo não especificado",
      }));

    return {
      props: {
        units: availableUnits,
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
