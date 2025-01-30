import { query } from "../utils/db";
import type { NextPage, GetServerSideProps } from "next";
import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { Unit } from "../types";

interface HomeProps {
  units: Unit[];
  totalUnits: number;
}

const Home: NextPage<HomeProps> = ({ units, totalUnits }) => {
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query: queryParams,
}) => {
  const page = queryParams.page ? parseInt(queryParams.page as string) : 1;
  const limit = 2; // Número de unidades por página
  const offset = (page - 1) * limit;

  const unitsResult = await query(
    `SELECT 
  idUnitUUID, 
  typename,
  unitNumber,
  address, 
  city, 
  state, 
neighborhood,
squaremeter,
  rentvalue::float AS rentvalue, -- Força o tipo numérico
  condominium::float AS condominium,
  watertax::float AS watertax,
  electricitytax::float AS electricitytax,
  internettax::float AS internettax,
  depositvalue::float AS depositvalue,
  imgUrl 
FROM "Unit"
WHERE available = true
ORDER BY createdAt DESC
LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const totalUnitsResult = await query(
    `SELECT COUNT(*) FROM "Unit" WHERE available = true`
  );

  const units = unitsResult.rows.map((unit) => ({
    ...unit,
    imgUrl: Array.isArray(unit.imgurl)
      ? unit.imgurl
      : unit.imgurl
      ? unit.imgurl
          .replace(/[{}]/g, "")
          .split(",")
          .map((url: string) => url.trim())
      : [],
  }));

  return {
    props: {
      units,
      totalUnits: parseInt(totalUnitsResult.rows[0].count, 10),
    },
  };
};

export default Home;
