// components/PropertyCosts.tsx
import React from "react";

type PropertyCostsProps = {
  rentValueNum: number;
  condominiumNum: number;
  waterTaxNum: number;
  electricityTaxNum: number;
  internetTaxNum: number;
  formatCurrency: (value: number | string) => string;
};

const PropertyCosts: React.FC<PropertyCostsProps> = ({
  rentValueNum,
  condominiumNum,
  waterTaxNum,
  electricityTaxNum,
  internetTaxNum,
  formatCurrency,
}) => {
  const totalCost =
    rentValueNum +
    condominiumNum +
    waterTaxNum +
    electricityTaxNum +
    internetTaxNum;

  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold mb-2">Custos do Imóvel</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-700 text-xs">Aluguel:</p>
          <p className="text-gray-700 text-xs text-right">
            {formatCurrency(rentValueNum)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-xs">Condomínio:</p>
          <p className="text-gray-700 text-xs text-right">
            {formatCurrency(condominiumNum) || "Consumo por conta do locatário"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-xs">Taxa de Água:</p>
          <p className="text-gray-700 text-xs text-right">
            {formatCurrency(waterTaxNum) || "Consumo por conta do locatário"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-xs">Taxa de Eletricidade:</p>
          <p className="text-gray-700 text-xs text-right">
            {formatCurrency(electricityTaxNum) ||
              "Consumo por conta do locatário"}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-xs">Taxa de Internet:</p>
          <p className="text-gray-700 text-xs text-right">
            {formatCurrency(internetTaxNum) || "Consumo por conta do locatário"}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2 pt-2">
        <div className="flex justify-between">
          <p className="text-sm font-bold">Total:</p>
          <p className="text-sm font-bold text-right">
            {formatCurrency(totalCost)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCosts;
