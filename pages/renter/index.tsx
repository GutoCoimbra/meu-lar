import type { NextPage } from "next";
import RenterForm from "@/components/RenterForm";
import Header from "@/components/Header";

const CadastroLocatario: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <RenterForm />
      </div>
    </div>
  );
};

export default CadastroLocatario;
