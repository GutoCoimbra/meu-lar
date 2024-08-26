// components/AvailableItems.tsx
import React from "react";

type AvailableItemsProps = {
  availableItems: string[];
};

const AvailableItems: React.FC<AvailableItemsProps> = ({ availableItems }) => {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-bold mb-4">Itens Disponíveis</h2>
      <ul className="text-xs list-disc list-inside pl-5">
        {availableItems.length > 0 ? (
          availableItems.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-700">Nenhum item disponível.</li>
        )}
      </ul>
    </div>
  );
};

export default AvailableItems;
