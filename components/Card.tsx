import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { ArrowPrev, ArrowNext } from "./Arrow";
import { Unit } from "@/types"; // Importando a interface Unit do arquivo types.ts
import { supabase } from "../utils/supabaseClient"; // Supabase client
import { useSession } from "next-auth/react"; // Autenticação

interface CardProps {
  unit: Unit | null;
}

const Card: React.FC<CardProps> = React.memo(({ unit }) => {
  const router = useRouter();
  const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);
  const prevImgUrlRef = useRef<string | string[] | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para acompanhar o slide atual
  const { data: session } = useSession(); // Sessão do usuário logado

  if (!unit) {
    return null;
  }

  const {
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
  } = unit;

  const parsedUrls = useMemo(() => {
    if (typeof imgUrl === "string") {
      return imgUrl
        .replace(/[{}]/g, "")
        .split(",")
        .map((url: string) => url.trim());
    } else if (Array.isArray(imgUrl)) {
      return imgUrl;
    }
    return [];
  }, [imgUrl]);

  useEffect(() => {
    if (prevImgUrlRef.current !== parsedUrls) {
      prevImgUrlRef.current = parsedUrls;
      setImagesAndVideos(parsedUrls);
    }
  }, [parsedUrls]);

  const totalValue =
    rentValue + condominium + waterTax + electricityTax + internetTax;

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    afterChange: (index: number) => {
      setCurrentSlide(index); // Atualiza o slide atual corretamente
    },
    customPaging: (i: number) => (
      <div
        className={`custom-dot w-3 h-3 rounded-full ${
          i === currentSlide ? "custom-dot-active" : "custom-dot-inactive"
        }`}
        style={{ transition: "background-color 0.3s ease" }}
      ></div>
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

  // Função para verificar se o imóvel já está favoritado
  useEffect(() => {
    const checkFavorite = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("favorite")
          .select("idfavorite")
          .eq("uuidgoogle", session.user.id) // `uuidgoogle` do usuário logado
          .eq("idunit", idUnit);

        if (data && data.length > 0) {
          setIsFavorited(true); // Se o favorito já existe, marca como favoritado
        } else {
          setIsFavorited(false);
        }
      }
    };

    checkFavorite();
  }, [session, idUnit]);

  // Função para alternar o estado de favorito
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!session?.user?.id) return; // Verifica se o usuário está logado

    if (isFavorited) {
      // Remover dos favoritos
      const { error } = await supabase
        .from("favorite")
        .delete()
        .eq("uuidgoogle", session.user.id)
        .eq("idunit", idUnit);

      if (!error) {
        setIsFavorited(false); // Atualiza o estado de favorito
      }
    } else {
      // Adicionar aos favoritos
      const { error } = await supabase.from("favorite").insert({
        uuidgoogle: session.user.id, // `uuidgoogle` do usuário logado
        idunit: idUnit,
        createdat: new Date(), // Data do favorito
      });

      if (!error) {
        setIsFavorited(true); // Atualiza o estado de favorito
      }
    }
  };

  const handleClick = () => {
    router.push(`property/${idUnit}`);
  };

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-md overflow-hidden relative max-w-custom mx-auto cursor-pointer md:max-w-xs"
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
          {typeName ? typeName : "Tipo não especificado"} {unitNumber}
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
});

export default Card;
