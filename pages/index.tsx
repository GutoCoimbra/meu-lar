import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { Unit } from "../types"; // Importando a interface Unit definida no arquivo types.ts

interface HomeProps {
  units: Unit[];
}

const Home: NextPage<HomeProps> = ({ units }) => {
  const [filteredUnits, setFilteredUnits] = useState<Unit[]>(units);

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

    console.log("Filtered units after applying filter:", filtered); // Log para depuração após o filtro
    setFilteredUnits(filtered);
  };

  return (
    <div className="p-0 bg-gray-100">
      <Header />

      <Filter onFilter={handleFilter} units={units} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit) => (
            <Card
              key={unit.idUnit}
              idUnit={unit.idUnit}
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
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/units");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const units = await res.json();

    // Filtrar as unidades disponíveis
    const availableUnits = units.filter(
      (unit: Unit) => unit.available === "sim"
    );

    console.log(
      "Fetched and filtered available units from API:",
      availableUnits
    ); // Adicione este log para verificar os dados da API

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
