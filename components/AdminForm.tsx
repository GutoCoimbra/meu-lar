// components/AdminForm.tsx
import React, { ChangeEvent, useEffect } from "react";
import { Unit } from "../types"; // Ajuste o caminho conforme necessário

interface AdminFormProps {
  unit: Unit;
  onSubmit: (updatedUnit: Unit) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ unit, onSubmit }) => {
  const [formData, setFormData] = React.useState<Unit>({
    ...unit,
    imgUrl: unit.imgUrl || [], // Inicializa como array vazio se estiver undefined
    renters: unit.renters || [], // Inicializa como array vazio se estiver undefined
  });

  useEffect(() => {
    // Atualiza o estado quando a prop `unit` mudar
    setFormData({
      ...unit,
      imgUrl: unit.imgUrl || [],
      renters: unit.renters || [],
    });
  }, [unit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo de Endereço */}
      <div>
        <label htmlFor="address" className="block font-medium">
          Endereço
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Número do Endereço */}
      <div>
        <label htmlFor="addressNumber" className="block font-medium">
          Número do Endereço
        </label>
        <input
          type="text"
          id="addressNumber"
          name="addressNumber"
          value={formData.addressNumber}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Número da Unidade */}
      <div>
        <label htmlFor="unitNumber" className="block font-medium">
          Número da Unidade
        </label>
        <input
          type="text"
          id="unitNumber"
          name="unitNumber"
          value={formData.unitNumber}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Tipo de Imóvel */}
      <div>
        <label htmlFor="type" className="block font-medium">
          Tipo de Imóvel
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Selecione o tipo</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Kitnet">Kitnet</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      {/* Campo Metros Quadrados */}
      <div>
        <label htmlFor="squareMeter" className="block font-medium">
          Metros Quadrados
        </label>
        <input
          type="number"
          id="squareMeter"
          name="squareMeter"
          value={formData.squareMeter}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Quartos */}
      <div>
        <label htmlFor="rooms" className="block font-medium">
          Quartos
        </label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Garagem */}
      <div>
        <label htmlFor="garage" className="block font-medium">
          Garagem
        </label>
        <input
          type="number"
          id="garage"
          name="garage"
          value={formData.garage}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Bairro */}
      <div>
        <label htmlFor="neighborhood" className="block font-medium">
          Bairro
        </label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Cidade */}
      <div>
        <label htmlFor="city" className="block font-medium">
          Cidade
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Estado */}
      <div>
        <label htmlFor="state" className="block font-medium">
          Estado
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo CEP */}
      <div>
        <label htmlFor="zipcode" className="block font-medium">
          CEP
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Disponível */}
      <div>
        <label htmlFor="available" className="block font-medium">
          Disponível
        </label>
        <select
          id="available"
          name="available"
          value={formData.available ? "sim" : "não"}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="sim">Sim</option>
          <option value="não">Não</option>
        </select>
      </div>

      {/* Campo Valor do Aluguel */}
      <div>
        <label htmlFor="rentValue" className="block font-medium">
          Valor do Aluguel
        </label>
        <input
          type="number"
          id="rentValue"
          name="rentValue"
          value={formData.rentValue}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Condomínio */}
      <div>
        <label htmlFor="condominium" className="block font-medium">
          Condomínio
        </label>
        <input
          type="number"
          id="condominium"
          name="condominium"
          value={formData.condominium}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Taxa de Água */}
      <div>
        <label htmlFor="waterTax" className="block font-medium">
          Taxa de Água
        </label>
        <input
          type="number"
          id="waterTax"
          name="waterTax"
          value={formData.waterTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Taxa de Energia */}
      <div>
        <label htmlFor="electricityTax" className="block font-medium">
          Taxa de Energia
        </label>
        <input
          type="number"
          id="electricityTax"
          name="electricityTax"
          value={formData.electricityTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Taxa de Internet */}
      <div>
        <label htmlFor="internetTax" className="block font-medium">
          Taxa de Internet
        </label>
        <input
          type="number"
          id="internetTax"
          name="internetTax"
          value={formData.internetTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Imagens e Vídeos */}
      <div>
        <label htmlFor="imgUrl" className="block font-medium">
          Imagens e Vídeos (URLs separados por vírgula)
        </label>
        <textarea
          id="imgUrl"
          name="imgUrl"
          value={
            Array.isArray(formData.imgUrl) ? formData.imgUrl.join(", ") : ""
          }
          onChange={(e) => {
            const imgUrls = e.target.value.split(",").map((url) => url.trim());
            setFormData({ ...formData, imgUrl: imgUrls });
          }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Campo Inquilinos */}
      <div>
        <label htmlFor="renters" className="block font-medium">
          Inquilinos (IDs separados por vírgula)
        </label>
        <textarea
          id="renters"
          name="renters"
          value={
            Array.isArray(formData.renters) ? formData.renters.join(", ") : ""
          }
          onChange={(e) => {
            const renters = e.target.value
              .split(",")
              .map((id) => Number(id.trim()));
            setFormData({ ...formData, renters });
          }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Atualizar Imóvel
      </button>
    </form>
  );
};

export default AdminForm;
