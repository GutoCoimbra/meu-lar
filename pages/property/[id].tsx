import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Slider from "react-slick";
import Image from "next/image";
import { ArrowPrev, ArrowNext } from "../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import PropertyFeatures from "@/components/PropertyFeatures";
import AvailableItems from "@/components/AvailableItems"; // Importação do componente ajustado
import { Unit } from "@/types";

interface Props {
  unit: Unit | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/units`);
  const units = await res.json();
  const paths = units.map((unit: Unit) => ({
    params: { id: unit.idUnit.toString() },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const resUnit = await fetch(`${siteUrl}/api/units/${id}`);
  const unit = await resUnit.json();

  const resTypes = await fetch(`${siteUrl}/api/unitType`);
  const types = await resTypes.json();

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

  const unitWithTypeName = {
    ...unit,
    typeName: unit.typeId ? typeMap[unit.typeId] : "Tipo não especificado",
  };

  return {
    props: { unit: unitWithTypeName },
    revalidate: 60,
  };
};

const PropertyPage = ({ unit }: Props) => {
  if (!unit) return <div>Unidade não encontrada.</div>;

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
    condominium,
    waterTax,
    electricityTax,
    internetTax,
    squareMeter,
    rooms,
    garage,
    bathroom,
    floor,
    petAllowed,
    furnished,
    elevator,
    averageRating = null, // Definir um valor padrão de `null` para evitar `undefined`
    availableItems = [], // Adicionando lista de items disponíveis para passar ao componente
  } = unit;

  const formatCurrency = (value: number | string) => {
    if (typeof value === "string") {
      value = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
    }
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

  return (
    <div className="p-0 bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {Array.isArray(imgUrl) &&
              imgUrl.map((src, index) =>
                src.endsWith(".mp4") ? (
                  <div key={index}>
                    <video controls className="w-full h-64 object-cover">
                      <source src={src} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div key={index} className="relative h-64 w-full">
                    <Image
                      src={src}
                      alt={`Imagem ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )
              )}
          </Slider>
        </div>

        <div className="p-2">
          <h1 className="text-xl font-bold mb-4">
            {address}, {neighborhood} - {city}, {state}
          </h1>

          <PropertyCosts
            rentValueNum={rentValueNum}
            condominiumNum={condominiumNum}
            waterTaxNum={waterTaxNum}
            electricityTaxNum={electricityTaxNum}
            internetTaxNum={internetTaxNum}
            formatCurrency={formatCurrency}
          />

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

          <p className="text-gray-600 mt-4">{description}</p>

          {/* Itens Disponíveis - Usando o componente ajustado */}
          <AvailableItems
            features={availableItems} // Passando os itens disponíveis como array
            accessInstructions="Use a chave digital" // Exemplo de instruções de acesso
            averageRating={averageRating} // Agora garantimos que `averageRating` nunca é `undefined`
            petAllowed={petAllowed}
            smokingAllowed={false} // Exemplo
            description={description}
            furnished={furnished}
          />

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
