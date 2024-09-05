import React, { useState, useEffect } from "react";
import FeatureForm from "../../components/FeatureForm"; // Certifique-se de que o caminho esteja correto

interface Feature {
  id: number;
  name: string;
}

const FeaturesAdminPage: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    const response = await fetch("/api/features");
    const data = await response.json();
    setFeatures(data);
  };

  const handleAddOrUpdateFeature = async (featureName: string) => {
    if (editingFeature) {
      await fetch("/api/features", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingFeature.id, name: featureName }),
      });
      setEditingFeature(null);
    } else {
      await fetch("/api/features/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: featureName }),
      });
    }
    fetchFeatures();
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
  };

  const handleDeleteFeature = async (id: number) => {
    const response = await fetch(`/api/features/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchFeatures();
    } else {
      console.error("Failed to delete feature:", await response.text());
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Administração de Características
      </h1>

      {/* Componente de formulário para adicionar ou editar características */}
      <FeatureForm
        onSubmit={handleAddOrUpdateFeature}
        initialValue={editingFeature ? editingFeature.name : ""}
      />

      {/* Lista de características */}
      <ul className="mt-6 w-96">
        {features.map((feature) => (
          <li
            key={feature.id}
            className="flex justify-between items-center py-2"
          >
            <span>{feature.name}</span>
            <div>
              <button
                onClick={() => handleEditFeature(feature)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteFeature(feature.id)}
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

export default FeaturesAdminPage;
