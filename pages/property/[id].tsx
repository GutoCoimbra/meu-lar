import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Slider from "react-slick";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import { ArrowPrev, ArrowNext } from "../../components/Arrow";
import Header from "@/components/Header";
import PropertyCosts from "@/components/PropertyCosts";
import PropertyFeatures from "@/components/PropertyFeatures";
import AvailableItems from "@/components/AvailableItems";
import VisitButton from "@/components/VisitButton";
import ScheduleVisitForm from "../../components/ScheduleVisitForm";
import { Unit } from "@/types";

interface Props {
  unit: Unit | null;
}

const PropertyPage = ({ unit }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleVisitClick = () => {
    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: router.asPath });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleUpdate = () => {
    // Lógica para ser executada após a visita ser agendada ou alterada
    console.log("Visita agendada/atualizada com sucesso.");
  };

  if (!unit) return <div>Unidade não encontrada.</div>;

  const {
    idUnit,
    imgUrl,
    address,
    neighborhood,
    city,
    state,
    unitNumber,
    typeName,
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
    averageRating,
    furnished,
    elevator,
    availableItems = [],
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
    afterChange: (index: number) => {
      setCurrentSlide(index);
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
        style={{ position: "absolute", bottom: "0px", width: "100%" }}
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
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )
              )}
          </Slider>
        </div>

        <div className="p-2">
          <h1 className="text-xl font-bold">
            {address}, {neighborhood} - {city}, {state}
          </h1>
          <p className="text-xs text-gray-700 mb-0 align-bottom">
            {typeName ? typeName : "Tipo não especificado"} {unitNumber}
          </p>

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

          <AvailableItems
            features={availableItems}
            accessInstructions="Use a chave digital"
            description={description}
            averageRating={averageRating ?? null}
            petAllowed={petAllowed}
            smokingAllowed={false}
            furnished={furnished}
          />

          <div className="flex flex-col items-center justify-center">
            <VisitButton className="btn mb-2" onClick={handleVisitClick} />
            <button onClick={() => window.history.back()} className="btn mb03">
              Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Modal para o agendamento de visitas */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ScheduleVisitForm
            unit_id={idUnit.toString()}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyPage;

// getStaticPaths para gerar páginas estaticamente
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/units`);
  const units = await res.json();

  const paths = units.map((unit: Unit) => ({
    params: { id: unit.idUnit.toString() },
  }));

  return { paths, fallback: "blocking" };
};

// getStaticProps para buscar os dados da unidade
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const resUnit = await fetch(`${siteUrl}/api/units/${id}`);
  const unit = await resUnit.json();

  if (!unit || Object.keys(unit).length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { unit },
    revalidate: 60, // Revalida a cada 60 segundos
  };
};
