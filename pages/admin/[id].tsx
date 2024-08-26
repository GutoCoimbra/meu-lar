// pages/admin/[id].tsx

import { GetServerSideProps } from "next";
import { useState } from "react";
import { Unit } from "../../types"; // Ajuste o caminho conforme a estrutura do seu projeto
import AdminForm from "../../components/AdminForm"; // Ajuste o caminho conforme a estrutura do seu projeto
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";

type AdminEditPageProps = {
  unit: Unit;
};

const AdminEditPage = ({ unit }: AdminEditPageProps) => {
  const [formData, setFormData] = useState<Unit>(unit);

  const handleFormSubmit = async (updatedUnit: Unit) => {
    const response = await fetch(`/api/units/${updatedUnit.idUnit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUnit),
    });

    if (response.ok) {
      alert("Imóvel atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar o imóvel.");
    }
  };

  return (
    <div>
      <Header />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Editar Imóvel</h1>
        <AdminForm unit={formData} onSubmit={handleFormSubmit} />
        <div className="mb-4">
          <Link href="/admin" className="text-blue-500 hover:underline">
            Voltar para a lista
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/units/${id}`); // Ajuste para o endpoint correto
  const unit: Unit = await res.json();

  return {
    props: {
      unit,
    },
  };
};

export default AdminEditPage;
