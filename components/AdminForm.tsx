import React, { ChangeEvent } from "react";
import { Unit } from "../types"; // Ajuste o caminho conforme necessário

interface AdminFormProps {
  unit: Unit;
  onSubmit: (updatedUnit: Unit) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ unit, onSubmit }) => {
  const [formData, setFormData] = React.useState<Unit>(unit);

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

      <div>
        <label htmlFor="addressNumber" className="block font-medium">
          Número
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

      <div>
        <label htmlFor="unitNumber" className="block font-medium">
          Unidade
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

      <div>
        <label htmlFor="type" className="block font-medium">
          Tipo
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="squareMeter" className="block font-medium">
          Metros Quadrados
        </label>
        <input
          type="text"
          id="squareMeter"
          name="squareMeter"
          value={formData.squareMeter}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="rooms" className="block font-medium">
          Quartos
        </label>
        <input
          type="text"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="garage" className="block font-medium">
          Garagem
        </label>
        <input
          type="text"
          id="garage"
          name="garage"
          value={formData.garage}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

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

      <div>
        <label htmlFor="available" className="block font-medium">
          Disponível
        </label>
        <select
          id="available"
          name="available"
          value={formData.available}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="sim">Sim</option>
          <option value="não">Não</option>
        </select>
      </div>

      <div>
        <label htmlFor="rentValue" className="block font-medium">
          Valor do Aluguel
        </label>
        <input
          type="text"
          id="rentValue"
          name="rentValue"
          value={formData.rentValue}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="condominium" className="block font-medium">
          Condomínio
        </label>
        <input
          type="text"
          id="condominium"
          name="condominium"
          value={formData.condominium}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="waterTax" className="block font-medium">
          Taxa de Água
        </label>
        <input
          type="text"
          id="waterTax"
          name="waterTax"
          value={formData.waterTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="electricityTax" className="block font-medium">
          Taxa de Energia
        </label>
        <input
          type="text"
          id="electricityTax"
          name="electricityTax"
          value={formData.electricityTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="internetTax" className="block font-medium">
          Taxa de Internet
        </label>
        <input
          type="text"
          id="internetTax"
          name="internetTax"
          value={formData.internetTax}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="imgUrl" className="block font-medium">
          Imagens e Vídeos (URLs separados por vírgula)
        </label>
        <textarea
          id="imgUrl"
          name="imgUrl"
          value={formData.imgUrl.join(", ")} // Convert array to comma-separated string
          onChange={(e) => {
            const imgUrls = e.target.value.split(",").map((url) => url.trim());
            setFormData({ ...formData, imgUrl: imgUrls });
          }}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="renters" className="block font-medium">
          Inquilinos (IDs separados por vírgula)
        </label>
        <textarea
          id="renters"
          name="renters"
          value={formData.renters.join(", ")} // Convert array to comma-separated string
          onChange={(e) => {
            const renters = e.target.value
              .split(",")
              .map((id) => Number(id.trim()));
            setFormData({ ...formData, renters: renters });
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
