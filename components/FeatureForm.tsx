import React, { useState, useEffect } from "react";

// Definindo as props que o componente espera
interface FeatureFormProps {
  onSubmit: (featureName: string) => void;
  initialValue?: string; // Prop opcional
}

const FeatureForm: React.FC<FeatureFormProps> = ({
  onSubmit,
  initialValue = "",
}) => {
  const [featureName, setFeatureName] = useState(initialValue);

  useEffect(() => {
    setFeatureName(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(featureName);
    setFeatureName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="featureName"
          className="block text-sm font-medium text-gray-700"
        >
          Nome da Característica
        </label>
        <input
          type="text"
          id="featureName"
          value={featureName}
          onChange={(e) => setFeatureName(e.target.value)}
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

export default FeatureForm;
