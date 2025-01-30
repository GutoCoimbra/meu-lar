import React from "react";
import ImageCarousel from "./ImageCarousel"; // Importe o carrossel de imagens
import { Unit } from "../types"; // Importar o tipo Unit

interface CardProps {
  unit: Unit;
}

const Card: React.FC<CardProps> = ({ unit }) => {
  const {
    typename,
    unitnumber,
    address,
    city,
    state,
    neighborhood,
    squaremeter,
    rentvalue,
    condominium,
    watertax,
    electricitytax,
    internettax,
    depositvalue,
    imgurl,
  } = unit;

  // Certifique-se de que imgurl seja um array
  const images = Array.isArray(imgurl) ? imgurl : [imgurl];

  const toNumber = (value: string | number | undefined): number =>
    typeof value === "string" ? parseFloat(value) : value || 0;

  // Cálculo do valor total
  const totalValue =
    toNumber(rentvalue) +
    toNumber(condominium) +
    toNumber(watertax) +
    toNumber(electricitytax) +
    toNumber(internettax) +
    toNumber(depositvalue);

  return (
    <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden w-[96%] relative bg-white">
      {/* Carrossel de imagens */}
      <ImageCarousel images={images} />

      {/* Informações da unidade */}
      <div className="p-2">
        <p className="text-sm text-gray-600">
          {typename} {unitnumber} · {squaremeter}m<sup>2</sup> com 2 quartos e 1
          banheiro
        </p>
        <p className="text-base font-bold mt-2">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValue || 0)}{" "}
          total
        </p>
        <p className="text-sm text-gray-600">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(rentvalue || 0)}{" "}
          aluguel
        </p>
        <p className="text-sm font-bold mt-2">{address}</p>
        <p className="text-sm text-gray-600">
          {neighborhood} - {city} - {state}
        </p>
      </div>
    </div>
  );
};

export default Card;
