import React from "react";

interface PropertyFeaturesProps {
  squareMeter: number;
  rooms: number;
  bathroom: number;
  garage: number;
  floor: number; // Ajustado para number
  petAllowed: boolean;
  furnished: boolean;
  elevator: boolean;
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  squareMeter,
  rooms,
  bathroom,
  garage,
  floor,
  petAllowed,
  furnished,
  elevator,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Primeira linha */}
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Tamanho" className="text-xl">
          📏
        </span>
        <span className="text-sm">{squareMeter} m²</span>
      </div>
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Quartos" className="text-xl">
          🛏️
        </span>
        <span className="text-sm">
          {rooms} {rooms > 1 ? "quartos" : "quarto"}
        </span>
      </div>

      {/* Segunda linha */}
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Banheiros" className="text-xl">
          🚿
        </span>
        <span className="text-sm">
          {bathroom} {bathroom > 1 ? "banheiros" : "banheiro"}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Garagem" className="text-xl">
          🚗
        </span>
        <span className="text-sm">
          {garage} {garage > 1 ? "vagas" : "vaga"}
        </span>
      </div>

      {/* Terceira linha */}
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Andar" className="text-xl">
          🏢
        </span>
        <span className="text-sm">{floor}º andar </span>{" "}
        {/* Ajuste para usar floor como number */}
      </div>
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Aceita pet" className="text-xl">
          🐾
        </span>
        <span className="text-sm">
          {petAllowed ? "Aceita pet" : "Não aceita pet"}
        </span>
      </div>

      {/* Quarta linha */}
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Mobiliado" className="text-xl">
          🛋️
        </span>
        <span className="text-sm">
          {furnished ? "Mobiliado" : "Sem mobília"}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="Elevador" className="text-xl">
          🛗
        </span>
        <span className="text-sm">
          {elevator ? "Com elevador" : "Sem elevador"}
        </span>
      </div>
    </div>
  );
};

export default PropertyFeatures;
