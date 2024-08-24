// pages/page/property/[id].tsx
import React, { useEffect, useState } from "react"; // Importando React
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowPrev, ArrowNext } from "../../../components/Arrow"; // Corrigido
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

  const { idUnit, imgUrl, address, rentValue, description } = unit;

  // Definindo o estado apenas no lado do cliente
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

  return (
    <div className="p-0 bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Imagens e Vídeos do Imóvel */}
        <div className="relative h-64 w-full">
          <Slider {...settings}>
            {imagesAndVideos.map((src, index) => {
              const fileExtension = path.extname(src).toLowerCase();

              return fileExtension === ".mp4" ? (
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
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        {/* Detalhes do Imóvel */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{address}</h1>
          <p className="text-xl text-gray-700 mb-4">Aluguel: R${rentValue}</p>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex space-x-4">
            <Link
              href="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
