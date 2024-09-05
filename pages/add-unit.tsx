import UnitForm from "../components/UnitForm";

const AddUnitPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Adicionar Nova Unidade</h1>
      <UnitForm />
    </div>
  );
};

export default AddUnitPage;
