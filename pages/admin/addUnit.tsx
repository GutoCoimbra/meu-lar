// pages/admin/addUnit.tsx
import React from "react";
import UnitForm from "../../components/UnitForm"; // Certifique-se de ajustar o caminho conforme necessário
import Header from "@/components/Header";

const AddUnitPage: React.FC = () => {
  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <h1 className="text-2xl font-bold text-center mb-6">
            Cadastro de Imóvel
          </h1>
          <UnitForm />
        </div>
      </div>
    </div>
  );
};

export default AddUnitPage;
