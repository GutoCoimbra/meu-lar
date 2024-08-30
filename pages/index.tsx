// pages/index.tsx
import { useState, useEffect } from "react";
import type { NextPage, GetStaticProps } from "next";
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
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  const handleFilter = (filters: {
    maxRentValue: number;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => {
    const filtered = units.filter((unit) => {
      const rentValue = Number(unit.rentValue.replace(/[^0-9.-]+/g, "")); // Converte string para número

      const matchesFilter =
        rentValue <= filters.maxRentValue &&
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

  // Verifique se a sessão existe antes de renderizar a página
  if (!session) {
    return (
      <p className="text-center">
        Você precisa estar logado para ver as unidades disponíveis.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-4 max-w-[1024px]">
        <Filter onFilter={handleFilter} units={units} />

        {/* Contêiner dos cards com limite de largura e centralização */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit, index) => (
              <Card
                key={`${unit.idUnit}-${index}`}
                idUnit={Number(unit.idUnit)} // Converte para número aqui
                address={unit.address}
                unitNumber={unit.unitNumber}
                type={unit.type}
                rentValue={unit.rentValue}
                condominium={unit.condominium}
                waterTax={unit.waterTax}
                electricityTax={unit.electricityTax}
                internetTax={unit.internetTax}
                squareMeter={unit.squareMeter}
                rooms={unit.rooms}
                garage={unit.garage}
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/units");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const units = await res.json();

    const availableUnits = units.filter(
      (unit: Unit) => unit.available === "sim"
    );

    return {
      props: {
        units: availableUnits,
      },
    };
  } catch (error) {
    console.error("Failed to fetch units:", error);
    return {
      props: {
        units: [],
      },
    };
  }
};

export default Home;
