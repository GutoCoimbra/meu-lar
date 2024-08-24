import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { ArrowPrev, ArrowNext } from "./Arrow";

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
  const router = useRouter();
  const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);

  useEffect(() => {
    // Simula a obtenção das URLs dos recursos
    const urls = [
      `/images/${idUnit}/image1.jpeg`,
      `/images/${idUnit}/image2.jpeg`,
      `/images/${idUnit}/video.mp4`,
    ];
    setImagesAndVideos(urls);
  }, [idUnit]);

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
    customPaging: (i: number) => (
      <div className="custom-dot w-3 h-3 bg-white rounded-full"></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{ position: "absolute", bottom: "8px", width: "100%" }}
        className="flex justify-center"
      >
        {dots}
      </div>
    ),
  };

  const handleClick = () => {
    router.push(`/page/property/${idUnit}`);
  };

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-md overflow-hidden relative max-w-xs mx-auto cursor-pointer"
      onClick={handleClick}
    >
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
      <div className="p-2 font-sans">
        <p className="text-xs text-gray-700 mb-1.5">{type}</p>
        <p className="text-lg text-gray-700 font-bold mb-0">
          R${" "}
          {totalValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          total
        </p>
        <p className="text-sm text-gray-700 mb-2">
          R${" "}
          {parseCurrency(rentValue).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          aluguel
        </p>

        <p className="text-sm text-gray-700">Endereço: {address}</p>

        <h3 className="text-xs mb-2">Unidade {unitNumber}</h3>
        <p className="text-xs font-bold text-gray-700">
          {squareMeter} m² - {rooms}{" "}
          {parseInt(rooms) > 1 ? "Cômodos" : "Cômodo"} - {garage}{" "}
          {parseInt(garage) > 1 ? "Vagas" : "Vaga"}
        </p>
      </div>
    </div>
  );
};

export default Card;
