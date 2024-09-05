// pages/admin/unitType.tsx
import React, { useState, useEffect } from "react";
import UnitTypeForm from "../../components/UnitTypeForm";

interface UnitType {
  idType: number;
  typeName: string;
}

const UnitTypeAdminPage: React.FC = () => {
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([]);
  const [editingUnitType, setEditingUnitType] = useState<UnitType | null>(null);

  useEffect(() => {
    fetchUnitTypes();
  }, []);

  // Função para buscar os tipos de unidade
  const fetchUnitTypes = async () => {
    const response = await fetch("/api/unitType");
    const data = await response.json();
    setUnitTypes(data);
  };

  // Função para adicionar um novo tipo de unidade
  const handleAddUnitType = async (typeName: string) => {
    if (editingUnitType) {
      // Atualizar o tipo de unidade existente
      await fetch("/api/unitType", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idType: editingUnitType.idType, typeName }),
      });
      setEditingUnitType(null);
    } else {
      // Adicionar um novo tipo de unidade
      await fetch("/api/unitType/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typeName }),
      });
    }
    fetchUnitTypes();
  };

  // Função para configurar um tipo de unidade para edição
  const handleEditUnitType = (unitType: UnitType) => {
    setEditingUnitType(unitType);
  };

  // Função para excluir um tipo de unidade
  const handleDeleteUnitType = async (id: number) => {
    await fetch(`/api/unitType/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idType: id }),
    });
    fetchUnitTypes();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Administração de Tipos de Unidade
      </h1>

      {/* Componente de formulário para adicionar ou editar tipos de unidade */}
      <UnitTypeForm
        onSubmit={handleAddUnitType}
        initialValue={editingUnitType ? editingUnitType.typeName : ""}
      />

      {/* Lista de tipos de unidade */}
      <ul className="mt-6 w-96">
        {unitTypes.map((unitType) => (
          <li
            key={unitType.idType}
            className="flex justify-between items-center py-2"
          >
            <span>{unitType.typeName}</span>
            <div>
              <button
                onClick={() => handleEditUnitType(unitType)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteUnitType(unitType.idType)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitTypeAdminPage;
