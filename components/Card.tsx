// components/Card.tsx
import React from "react";
import Slider from "react-slick";
import { ArrowPrev, ArrowNext } from "./Arrow"; // Importe os componentes de seta

interface CardProps {
  idUnit: number;
  address: string;
  unitNumber: string;
  type: string;
  rentValue: string;
  condominium: string;
  waterTax: string;
  electricityTax: string;
  internetTax: string;
  squareMeter: string;
  rooms: string;
  garage: string;
}

const Card: React.FC<CardProps> = ({
  idUnit,
  address,
  unitNumber,
  type,
  rentValue,
  condominium,
  waterTax,
  electricityTax,
  internetTax,
  squareMeter,
  rooms,
  garage,
}) => {
  const imagesAndVideos = [
    `/images/${idUnit}/image1.jpeg`,
    `/images/${idUnit}/image2.jpeg`,
    `/images/${idUnit}/video.mp4`,
  ];

  const parseCurrency = (value: string) => {
    if (!value) return 0;
    return parseFloat(value.replace("R$", "").replace(",", ".").trim()) || 0;
  };

  const totalValue =
    parseCurrency(rentValue) +
    parseCurrency(condominium) +
    parseCurrency(waterTax) +
    parseCurrency(electricityTax) +
    parseCurrency(internetTax);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden relative">
      <Slider {...settings}>
        {imagesAndVideos.map((src, index) =>
          src.endsWith(".mp4") ? (
            <div key={index}>
              <video controls className="w-full h-48 object-cover">
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img
              key={index}
              src={src}
              alt={`Imagem ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          )
        )}
      </Slider>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Unidade {unitNumber}</h3>
        <p className="text-lg text-gray-700">Tipo: {type}</p>
        <p className="text-lg text-gray-700">Endereço: {address}</p>
        <p className="text-lg text-gray-700">
          Valor Total: R${totalValue.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-lg text-gray-700">Valor do Aluguel: {rentValue}</p>
        <p className="text-lg text-gray-700">{squareMeter}m²</p>
        <p className="text-lg text-gray-700">
          {rooms} {parseInt(rooms) > 1 ? "Cômodos" : "Cômodo"}
        </p>
        <p className="text-lg text-gray-700">
          {garage} {parseInt(garage) > 1 ? "Vagas" : "Vaga"}
        </p>
      </div>
    </div>
  );
};

export default Card;
