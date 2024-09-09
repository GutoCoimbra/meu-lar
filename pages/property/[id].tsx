import React, { useEffect, useState, useRef, useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowPrev, ArrowNext } from "../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import PropertyFeatures from "@/components/PropertyFeatures";

type Unit = {
  idUnit: number;
  address: string;
  number: string;
  unit: string;
  type: string;
  squareMeter: string;
  rooms: string;
  bathroom: string;
  garage: string;
  floor: string;
  petAllowed: boolean;
  furnished: boolean;
  elevator: boolean;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  available: string;
  rentValue: string;
  condominium: string;
  waterTax: string;
  electricityTax: string;
  internetTax: string;
  imgUrl: string | string[];
  description: string;
  availableItems: string[];
};

type Props = {
  unit: Unit | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/units`);

    if (!res.ok) {
      throw new Error("Failed to fetch units");
    }

    const units = await res.json();

    const paths = units.map((unit: Unit) => ({
      params: { id: unit.idUnit.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/units/${id}`
    );

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const unit = await res.json();

    return {
      props: {
        unit: unit || null,
      },
      revalidate: 60, // Revalidação dos dados a cada 60 segundos
    };
  } catch (error) {
    console.error("Erro ao buscar dados da unidade:", error);
    return {
      notFound: true,
    };
  }
};

const PropertyPage = ({ unit }: Props) => {
  if (!unit) {
    return <div>Unidade não encontrada.</div>;
  }

  const {
    idUnit,
    imgUrl,
    address,
    neighborhood,
    city,
    state,
    zipcode,
    rentValue,
    description,
    availableItems = [],
    condominium,
    waterTax,
    electricityTax,
    internetTax,
    squareMeter,
    rooms,
    bathroom,
    garage,
    floor,
    petAllowed,
    furnished,
    elevator,
  } = unit;

  const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);
  const prevImgUrlRef = useRef<string | string[] | null>(null);

  // Memoize and parse the image URLs
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
      prevImgUrlRef.current = parsedUrls;
      setImagesAndVideos(parsedUrls);
    }
  }, [parsedUrls]);

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

  const formatCurrency = (value: number | string) => {
    if (typeof value === "string") {
      value = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
    }
    if (isNaN(value)) return "Consumo por conta do locatário";

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatCurrencyValue = (value: number | string | null | undefined) => {
    if (typeof value === "string") {
      value = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
    }
    return value || 0;
  };

  const rentValueNum = formatCurrencyValue(rentValue);
  const condominiumNum = formatCurrencyValue(condominium);
  const waterTaxNum = formatCurrencyValue(waterTax);
  const electricityTaxNum = formatCurrencyValue(electricityTax);
  const internetTaxNum = formatCurrencyValue(internetTax);

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${zipcode}`;

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {imagesAndVideos.map((src, index) =>
              src.endsWith(".mp4") ? (
                <div key={index}>
                  <video controls className="w-full h-64 object-cover">
                    <source src={src} type="video/mp4" />
                    Seu navegador não suporta o vídeo.
                  </video>
                </div>
              ) : (
                <div key={index} className="relative h-64 w-full">
                  <Image
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              )
            )}
          </Slider>
        </div>

        {/* Detalhes do Imóvel */}
        <div className="p-6">
          <span className="text-1xl font-bold">
            {address} - {neighborhood} - {city} - {state}
          </span>

          {/* Link para o Google Maps */}
          <div className="mb-4">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ver no Google Maps
            </a>
          </div>

          {/* Integração do PropertyCosts */}
          <PropertyCosts
            rentValueNum={rentValueNum}
            condominiumNum={condominiumNum}
            waterTaxNum={waterTaxNum}
            electricityTaxNum={electricityTaxNum}
            internetTaxNum={internetTaxNum}
            formatCurrency={formatCurrency}
          />

          {/* Integração do PropertyFeatures */}
          <PropertyFeatures
            squareMeter={parseInt(squareMeter)}
            rooms={parseInt(rooms)}
            bathroom={parseInt(bathroom)}
            garage={parseInt(garage)}
            floor={parseInt(floor)}
            petAllowed={petAllowed}
            furnished={furnished}
            elevator={elevator}
          />

          <p className="text-gray-600 mb-4">{description}</p>

          {/* Itens Disponíveis */}
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
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default PropertyPage;
