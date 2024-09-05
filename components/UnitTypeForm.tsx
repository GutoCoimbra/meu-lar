// components/UnitTypeForm.tsx
import React, { useState, useEffect } from "react";

// Definição da interface para as props do formulário
interface UnitTypeFormProps {
  onSubmit: (typeName: string) => Promise<void>;
  initialValue?: string;
}

// Componente UnitTypeForm que aceita props
const UnitTypeForm: React.FC<UnitTypeFormProps> = ({
  onSubmit,
  initialValue = "",
}) => {
  const [typeName, setTypeName] = useState(initialValue);

  // Atualiza o valor do campo de entrada ao receber uma nova prop inicial
  useEffect(() => {
    setTypeName(initialValue);
  }, [initialValue]);

  // Função de manipulação do submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(typeName);
    setTypeName(""); // Limpa o campo após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="typeName"
          className="block text-sm font-medium text-gray-700"
        >
          Nome do Tipo de Unidade
        </label>
        <input
          type="text"
          id="typeName"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialValue ? "Atualizar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
};

export default UnitTypeForm;
