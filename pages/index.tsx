import type { NextPage, GetServerSideProps } from "next";
import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { Unit } from "../types";

interface HomeProps {
  units: Unit[];
}

const Home: NextPage<HomeProps> = ({ units }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>

      <div className="flex-1 container mx-auto py-4 max-w-[1024px]">
        <Filter onFilter={() => {}} units={units} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 justify-items-center">
          {units.length > 0 ? (
            units.map((unit, index) => (
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    // Obtendo a URL base da API a partir da variável de ambiente
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("A variável NEXT_PUBLIC_API_BASE_URL não está definida.");
    }

    // Fazendo a requisição à API para obter as unidades
    const response = await fetch(`${apiBaseUrl}/units`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar unidades: ${response.statusText}`);
    }

    const units = await response.json();

    return {
      props: {
        units,
      },
    };
  } catch (error) {
    console.error("Erro no getServerSideProps:", error);

    return {
      props: {
        units: [],
      },
    };
  }
};

export default Home;
