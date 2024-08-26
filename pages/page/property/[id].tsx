import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowPrev, ArrowNext } from "../../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import AvailableItems from "@/components/AvailableItems";

type Unit = {
  idUnit: number;
  address: string;
  addressNumber: string;
  unitNumber: string;
  type: string;
  squareMeter: string;
  rooms: string;
  garage: string;
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
  imgUrl: string[];
  description: string;
  availableItems: string[];
};

type Props = {
  unit: Unit | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "units.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const units: Unit[] = JSON.parse(jsonData);

  const paths = units.map((unit) => ({
    params: { id: unit.idUnit.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string;
  const filePath = path.join(process.cwd(), "data", "units.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const units: Unit[] = JSON.parse(jsonData);

  const unit = units.find((unit) => unit.idUnit.toString() === id) || null;

  return {
    props: {
      unit,
    },
    revalidate: 60,
  };
};

const PropertyPage = ({ unit }: Props) => {
  if (!unit) {
    return <div>Unidade não encontrada.</div>;
  }

  const {
    idUnit,
    imgUrl,
    address,
    unitNumber,
    neighborhood,
    city,
    state,
    zipcode,
    rentValue,
    description,
    availableItems,
    condominium,
    waterTax,
    electricityTax,
    internetTax,
  } = unit;

  const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);

  useEffect(() => {
    const urls = imgUrl.map((fileName) => `/images/${idUnit}/${fileName}`);
    setImagesAndVideos(urls);
  }, [idUnit, imgUrl]);

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

  const rentValueNum =
    parseFloat(rentValue.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const condominiumNum =
    parseFloat(condominium.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const waterTaxNum =
    parseFloat(waterTax.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const electricityTaxNum =
    parseFloat(electricityTax.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  const internetTaxNum =
    parseFloat(internetTax.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${zipcode}`;

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {imagesAndVideos.map((src, index) => {
              if (!src) return null;

              const fileExtension = src.split(".").pop()?.toLowerCase() || "";

              return fileExtension === "mp4" ? (
                <div key={index} className="relative h-64 w-full">
                  <video
                    src={src}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div key={index} className="relative h-64 w-full">
                  <Image
                    src={src}
                    alt={`Imagem do Imóvel ${index + 1}`}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        {/* Detalhes do Imóvel */}
        <div className="p-6">
          <span className="text-1xl font-bold">
            {address} - {neighborhood} - {city} - {state}
          </span>
          <br />
          <span className="text-1xl">Unidade {unitNumber}</span>

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

          {/* Custos do Imóvel */}
          <PropertyCosts
            rentValueNum={rentValueNum}
            condominiumNum={condominiumNum}
            waterTaxNum={waterTaxNum}
            electricityTaxNum={electricityTaxNum}
            internetTaxNum={internetTaxNum}
            formatCurrency={formatCurrency}
          />

          <p className="text-gray-600 mb-4">{description}</p>

          {/* Itens Disponíveis */}
          <AvailableItems availableItems={availableItems} />
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
