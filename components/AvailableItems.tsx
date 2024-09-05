import React from "react";

type AvailableItemsProps = {
  features: string[]; // Características especiais do imóvel como uma lista de strings
  accessInstructions: string; // Instruções de acesso ao imóvel
  averageRating: number | null; // Classificação média do imóvel
  petAllowed: boolean; // Indica se animais de estimação são permitidos
  smokingAllowed: boolean; // Indica se é permitido fumar no imóvel
  description: string; // Descrição do imóvel
  furnished: boolean; // Indica se o imóvel é mobiliado
};

const AvailableItems: React.FC<AvailableItemsProps> = ({
  features,
  accessInstructions,
  averageRating,
  petAllowed,
  smokingAllowed,
  description,
  furnished,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-bold mb-4">Detalhes do Imóvel</h2>

      {/* Descrição */}
      <div className="mb-4">
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Características Especiais */}
      <div className="mb-4">
        <h3 className="text-xs font-bold">Características Especiais:</h3>
        <ul className="text-xs list-disc list-inside pl-5">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))
          ) : (
            <li className="text-gray-700">
              Nenhuma característica especial listada.
            </li>
          )}
        </ul>
      </div>

      {/* Instruções de Acesso */}
      <div className="mb-4">
        <h3 className="text-xs font-bold">Instruções de Acesso:</h3>
        <p className="text-gray-700">{accessInstructions}</p>
      </div>

      {/* Avaliação Média */}
      <div className="mb-4">
        <h3 className="text-xs font-bold">Avaliação Média:</h3>
        <p className="text-gray-700">
          {averageRating !== null ? averageRating.toFixed(2) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AvailableItems;
