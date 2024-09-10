import React from "react";
import VisitButton from "./VisitButton";

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
    <div className="mt-4">
      <h2 className="text-sm font-bold mb-1">Detalhes do Imóvel</h2>

      {/* Descrição */}
      <div className="mb-3">
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {/* Características Especiais */}
      <div className="mb-3">
        <h3 className="text-sm font-bold mb-1">Itens Disponíveis</h3>
        <ul className="text-sm list-disc list-inside pl-5">
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
      <div className="mb-3">
        <h3 className="text-sm font-bold mb-1">Instruções de Acesso</h3>
        <p className="text-gray-700">{accessInstructions}</p>
      </div>

      {/* Avaliação Média */}
      <div className="mb-2">
        <h3 className="text-sm font-bold">Avaliação Média</h3>
        <div className="flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="gold"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="1"
                  stdDeviation="1"
                  floodColor="#000"
                  floodOpacity="0.4"
                />
              </filter>
            </defs>
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              filter="url(#shadow)"
            />
          </svg>
          <p className="text-gray-700">
            {averageRating !== null ? averageRating.toFixed(2) : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableItems;
