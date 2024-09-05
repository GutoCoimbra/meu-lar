import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { ArrowPrev, ArrowNext } from "./Arrow";

interface CardProps {
  idUnit: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  unitNumber: string;
  typeName?: string;
  rentValue: number;
  condominium: number;
  waterTax: number;
  electricityTax: number;
  internetTax: number;
  squareMeter: number;
  rooms: number;
  garage: number;
  averageRating: number | null | undefined; // Permitir null ou undefined
  imgUrl: string | string[];
}

const Card: React.FC<CardProps> = React.memo(
  ({
    idUnit,
    address,
    neighborhood,
    city,
    state,
    unitNumber,
    typeName,
    rentValue,
    condominium,
    waterTax,
    electricityTax,
    internetTax,
    squareMeter,
    rooms,
    garage,
    averageRating,
    imgUrl,
  }) => {
    const router = useRouter();
    const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);
    const prevImgUrlRef = useRef<string | string[] | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const parsedUrls = useMemo(() => {
      if (typeof imgUrl === "string") {
        return imgUrl
          .replace(/[{}]/g, "")
          .split(",")
          .map((url) => url.trim());
      } else if (Array.isArray(imgUrl)) {
        return imgUrl;
      }
      return [];
    }, [imgUrl]);

    useEffect(() => {
      if (prevImgUrlRef.current !== parsedUrls) {
        prevImgUrlRef.current = parsedUrls; // Atualiza ref para os parsedUrls atuais

        setImagesAndVideos(parsedUrls);
      }
    }, [parsedUrls]);

    const totalValue =
      rentValue + condominium + waterTax + electricityTax + internetTax;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <ArrowPrev />,
      nextArrow: <ArrowNext />,
      customPaging: (i: number) => (
        <div className="custom-dot w-2 h-2 bg-white rounded-full"></div>
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
        <div className="px-2 pt-2 font-sans flex justify-between items-start">
          <p className="text-xs text-gray-700 mb-0 align-bottom">
            {typeName ? typeName : "Tipo não especificado"}
          </p>
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
        <div className="pt-0 px-2 font-sans">
          <p className="text-base text-gray-700 font-bold mb-0">
            R${" "}
            {totalValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            total
          </p>
          <p className="text-sm text-gray-700 mb-2">
            R${" "}
            {rentValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            aluguel
          </p>

          <p className="text-sm text-gray-700 mb-2">
            {address}, {neighborhood} <br />
            {city}-{state}
          </p>
          <div className="font-sans flex justify-between items-start">
            <p className="text-xs font-bold text-gray-700 mb-3">
              {squareMeter} m² - {rooms} {rooms > 1 ? "Cômodos" : "Cômodo"} -{" "}
              {garage} {garage > 1 ? "Vagas" : "Vaga"}
            </p>
            <p className="flex text-xs font-bold text-gray-700 mb-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="gold"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
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
              {averageRating}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
