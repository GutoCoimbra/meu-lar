// pages/admin/index.tsx

import { GetServerSideProps } from "next";
import Link from "next/link";
import { Unit } from "../../types"; // Ajuste o caminho conforme a estrutura do seu projeto
import Header from "@/components/Header";

type AdminPageProps = {
  units: Unit[];
};

const AdminPage = ({ units }: AdminPageProps) => {
  return (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Administração de Imóveis</h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Endereço</th>
              <th className="py-2">Unidade</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Disponível</th>
              <th className="py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.idUnit} className="border-t">
                <td className="py-2">{unit.idUnit}</td>
                <td className="py-2">{`${unit.address}, ${unit.addressNumber}`}</td>
                <td className="py-2">{unit.unitNumber}</td>
                <td className="py-2">{unit.type}</td>
                <td className="py-2">{unit.available}</td>

                <td className="py-2">
                  <Link href={`/admin/${unit.idUnit}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/units"); // Ajuste para o endpoint correto
  const units: Unit[] = await res.json();

  return {
    props: {
      units,
    },
  };
};

export default AdminPage;
