import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowPrev, ArrowNext } from "../../../components/Arrow";
import Header from "@/components/Header";

type Unit = {
  idUnit: number;
  address: string;
  number: string;
  unit: string;
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

  const totalCost =
    rentValueNum +
    condominiumNum +
    waterTaxNum +
    electricityTaxNum +
    internetTaxNum;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${zipcode}`;

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {imagesAndVideos.map((src, index) => {
              // Verifica se src não é nulo ou indefinido
              if (!src) return null;

              // Verifica a extensão do arquivo
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
                  {formatCurrency(condominiumNum) ||
                    "Consumo por conta do locatário"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 text-xs">Taxa de Água:</p>
                <p className="text-gray-700 text-xs text-right">
                  {formatCurrency(waterTaxNum) ||
                    "Consumo por conta do locatário"}
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
                  {formatCurrency(internetTaxNum) ||
                    "Consumo por conta do locatário"}
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
