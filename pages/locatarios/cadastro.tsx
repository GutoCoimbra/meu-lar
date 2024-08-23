import type { NextPage } from "next";
import LocatarioForm from "../../components/LocatarioForm";

const CadastroLocatario: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LocatarioForm />
    </div>
  );
};

export default CadastroLocatario;
