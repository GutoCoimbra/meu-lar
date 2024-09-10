import React, { useEffect, useState, useRef, useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowPrev, ArrowNext } from "../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import PropertyFeatures from "@/components/PropertyFeatures";
import { Unit } from "@/types"; // Importando a interface Unit do arquivo types.ts

interface Props {
  unit: Unit | null;
}

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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Buscar os dados da unidade pelo ID
    const resUnit = await fetch(`${siteUrl}/api/units/${id}`);
    if (!resUnit.ok) {
      return { notFound: true };
    }
    const unit = await resUnit.json();

    // Buscar tipos através da API
    const resTypes = await fetch(`${siteUrl}/api/unitType`);
    if (!resTypes.ok) {
      throw new Error("Failed to fetch types");
    }
    const types = await resTypes.json();

    // Mapeia os tipos para facilitar o acesso pelo ID
    const typeMap = types.reduce(
      (
        acc: { [key: number]: string },
        type: { idType: number; typeName: string }
      ) => {
        acc[type.idType] = type.typeName;
        return acc;
      },
      {}
    );

    // Adiciona o nome do tipo à unidade
    const unitWithTypeName = {
      ...unit,
      typeName: unit.typeId ? typeMap[unit.typeId] : "Tipo não especificado",
    };

    return {
      props: {
        unit: unitWithTypeName,
      },
      revalidate: 60, // Revalidação dos dados a cada 60 segundos
    };
  } catch (error) {
    console.error("Erro ao buscar dados da unidade:", error);
    return { notFound: true };
  }
};

const PropertyPage = ({ unit }: Props) => {
  const router = useRouter();

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

  // Função para formatar valores como moeda
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

  const rentValueNum = parseFloat(rentValue.toString());
  const condominiumNum = parseFloat(condominium.toString());
  const waterTaxNum = parseFloat(waterTax.toString());
  const electricityTaxNum = parseFloat(electricityTax.toString());
  const internetTaxNum = parseFloat(internetTax.toString());

  // Configurações para o Slider
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

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${zipcode}`;

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {imgUrl.map((src, index) =>
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
                    className="object-cover"
                  />
                </div>
              )
            )}
          </Slider>
        </div>

        {/* Detalhes do Imóvel */}
        <div className="p-2">
          <p className="text-xs text-gray-700 mb-0 align-bottom">
            {unit.typeName ? unit.typeName : "Tipo não especificado"}{" "}
            {unitNumber}
          </p>

          <span className="text-1xl font-bold">
            {address} - {neighborhood} - {city} - {state}
          </span>
          <div className="mb-4">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ver no mapa
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
            squareMeter={squareMeter}
            rooms={rooms}
            bathroom={bathroom}
            garage={garage}
            floor={floor}
            petAllowed={petAllowed}
            furnished={furnished}
            elevator={elevator}
          />

          <p className="text-gray-600 mb-4 mt-4">{description}</p>

          {/* Itens Disponíveis */}
          <div className="mt-8">
            <h2 className="text-sm font-bold mb-4">Itens Disponíveis</h2>
            <ul className="text-sm list-disc list-inside pl-5">
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
          <div className="flex flex-col items-center justify-center">
            <button className="btn mb-4">Agendar Visita</button>
            <button onClick={() => window.history.back()} className="btn">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
