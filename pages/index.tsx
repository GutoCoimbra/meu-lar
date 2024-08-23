// pages/index.tsx
import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Card from "../components/Card";
import Filter from "../components/Filter"; // Importar o componente de filtro

interface Unit {
  idUnit: number; // Adicione a propriedade idUnit
  address: string;
  number: string;
  unit: string;
  type: string;
  squareMeter: string;
  rooms: string;
  garage: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  available: string;
  rentValue: string;
  condominium: string;
  waterTax: string;
  electricityTax: string;
  internetTax: string;
  imgUrl: string;
  renters: number[];
}

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

      return (
        rentValue <= filters.maxRentValue &&
        (filters.state === "" || unit.state === filters.state) &&
        (filters.city === "" || unit.city === filters.city) &&
        (filters.neighborhood === "" ||
          unit.neighborhood === filters.neighborhood) &&
        (filters.address === "" || unit.address === filters.address)
      );
    });

    setFilteredUnits(filtered);
  };

  return (
    <div className="p-4 bg-gray-100">
      <Filter onFilter={handleFilter} units={units} />
      {/* Grid responsiva ajustada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map((unit) => (
          <Card
            key={unit.idUnit} // Use idUnit como chave
            idUnit={unit.idUnit} // Passe idUnit para o Card
            address={unit.address}
            unitNumber={unit.unit}
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
        ))}
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

    return {
      props: {
        units,
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
