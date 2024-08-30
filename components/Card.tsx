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
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
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
      <div className="p-2 font-sans flex justify-between items-start">
        <p className="text-xs text-gray-700 mb-0">{type}</p>{" "}
        {/* Removido mb-1.5 para mb-0 */}
        <button
          onClick={toggleFavorite}
          className="focus:outline-none"
          aria-label="Favoritar"
        >
          {isFavorited ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-2 font-sans">
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
