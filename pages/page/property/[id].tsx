import React, { useEffect, useState } from "react";
import PropertyFeatures from "../../../components/PropertyFeatures";
import { GetServerSideProps } from "next";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowPrev, ArrowNext } from "../../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import AvailableItems from "@/components/AvailableItems";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  unit: {
    idUnit: number;
    address: string;
    addressNumber: string;
    unitNumber: string;
    typeName?: string;
    squareMeter: number;
    rooms: number;
    bathroom: number;
    garage: number;
    floor: number;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    available: boolean;
    rentValue: number;
    condominium: number;
    waterTax: number;
    electricityTax: number;
    internetTax: number;
    depositValue: number;
    maintenanceFee: number;
    lastMaintenanceDate: string | null;
    averageRating: number | null;
    createdAt: string;
    updatedAt: string;
    leaseStartDate: string | null;
    leaseEndDate: string | null;
    imgUrl: string | string[]; // imgUrl é string ou array de strings
    description: string;
    features: string[];
    accessInstructions: string;
    petAllowed: boolean;
    smokingAllowed: boolean;
    furnished: boolean;
  } | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params?.id as string;

  try {
    const unit = await prisma.unit.findUnique({
      where: { idUnit: Number(id) },
      include: {
        unitType: true,
        features: true,
      },
    });

    await prisma.$disconnect();

    if (!unit) {
      return {
        notFound: true,
      };
    }

    const serializedUnit = {
      ...unit,
      typeName: unit.unitType?.typeName || "Tipo não especificado",
      squareMeter: unit.squareMeter ?? 0,
      rooms: unit.rooms ?? 0,
      bathroom: unit.bathroom ?? 0,
      garage: unit.garage ?? 0,
      floor: unit.floor ?? 0,
      rentValue: unit.rentValue ?? 0,
      condominium: unit.condominium ?? 0,
      waterTax: unit.waterTax ?? 0,
      electricityTax: unit.electricityTax ?? 0,
      internetTax: unit.internetTax ?? 0,
      depositValue: unit.depositValue ?? 0,
      maintenanceFee: unit.maintenanceFee ?? 0,
      lastMaintenanceDate: unit.lastMaintenanceDate
        ? unit.lastMaintenanceDate.toISOString()
        : null,
      averageRating: unit.averageRating ?? null,
      createdAt: unit.createdAt.toISOString(),
      updatedAt: unit.updatedAt.toISOString(),
      leaseStartDate: unit.leaseStartDate
        ? unit.leaseStartDate.toISOString()
        : null,
      leaseEndDate: unit.leaseEndDate ? unit.leaseEndDate.toISOString() : null,
      features: unit.features ? unit.features.map((f) => f.name) : [],
      accessInstructions: unit.accessInstructions || "",
      petAllowed: unit.petAllowed,
      smokingAllowed: unit.smokingAllowed,
      furnished: unit.furnished,
      imgUrl: unit.imgUrl
        ? Array.isArray(unit.imgUrl)
          ? unit.imgUrl
          : [unit.imgUrl]
        : [], // Forçar imgUrl para ser sempre um array
      description: unit.description || "",
    };

    return {
      props: {
        unit: serializedUnit,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar unidade:", error);
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
    unitNumber,
    neighborhood,
    city,
    state,
    zipcode,
    rentValue,
    description,
    condominium,
    waterTax,
    electricityTax,
    internetTax,
    depositValue,
    maintenanceFee,
    lastMaintenanceDate,
    averageRating,
    createdAt,
    updatedAt,
    leaseStartDate,
    leaseEndDate,
    features,
    accessInstructions,
    petAllowed,
    smokingAllowed,
    furnished,
    squareMeter,
    rooms,
    bathroom,
    garage,
    floor,
  } = unit;

  const [imagesAndVideos, setImagesAndVideos] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(imgUrl)) {
      setImagesAndVideos(imgUrl);
    } else if (typeof imgUrl === "string") {
      const parsedUrls = imgUrl.split(",").map((url) => url.trim());
      setImagesAndVideos(parsedUrls);
    }
  }, [idUnit, imgUrl]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
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

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${zipcode}`;

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative w-full">
          <Slider {...settings}>
            {imagesAndVideos.length > 0 ? (
              imagesAndVideos.map((src, index) => {
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
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Nenhuma imagem disponível</span>
              </div>
            )}
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
            rentValueNum={rentValue}
            condominiumNum={condominium}
            waterTaxNum={waterTax}
            electricityTaxNum={electricityTax}
            internetTaxNum={internetTax}
            formatCurrency={formatCurrency}
          />

          {/* Características do Imóvel */}
          <PropertyFeatures
            squareMeter={squareMeter}
            rooms={rooms}
            bathroom={bathroom}
            garage={garage}
            floor={floor}
            petAllowed={petAllowed}
            furnished={furnished}
            elevator={true} // Passe o valor correto para elevator
          />

          {/* Itens Disponíveis */}
          <AvailableItems
            features={features}
            accessInstructions={accessInstructions}
            averageRating={averageRating ?? 0}
            petAllowed={petAllowed}
            smokingAllowed={smokingAllowed}
            description={description}
            furnished={furnished}
          />
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
