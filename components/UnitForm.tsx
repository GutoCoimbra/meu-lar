// components/UnitForm.tsx
import React, { useState } from "react";
import { Unit } from "../types"; // Ajuste o caminho conforme necessário

const UnitForm: React.FC = () => {
  const [formData, setFormData] = useState<Unit>({
    idUnit: "0", // Este campo pode ser gerado automaticamente ou atribuído de outra forma
    address: "",
    addressNumber: "",
    unitNumber: "",
    type: "",
    squareMeter: "",
    rooms: "",
    garage: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    available: "sim",
    rentValue: "",
    condominium: "",
    waterTax: "",
    electricityTax: "",
    internetTax: "",
    imgUrl: [],
    availableItems: [],
    renters: [],
  });

  const availableItemsOptions = [
    "Armários no quarto",
    "Armários nos banheiros",
    "Armários na cozinha",
    "Ar condicionado",
    "Chuveiro a gás",
    "Fogão incluso",
    "Geladeira inclusa",
    "Home-office",
    "Quartos e corredores com portas amplas",
    "Área de serviço",
    "Banheira de hidromassagem",
    "Varanda",
    "Piscina privativa",
    "Apartamento cobertura",
    "Banheiro adaptado",
    "Closet",
    "Cozinha americana",
    "Jardim",
    "Quintal",
    "Somente uma casa no terreno",
    "Garden/Área Privativa",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (item: string) => {
    setFormData((prevState) => {
      const items = prevState.availableItems.includes(item)
        ? prevState.availableItems.filter((i) => i !== item)
        : [...prevState.availableItems, item];
      return { ...prevState, availableItems: items };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Envio dos dados para a API
    try {
      const response = await fetch("/api/units", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar imóvel");
      }

      alert("Imóvel cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o imóvel");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow-md"
    >
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Endereço
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Endereço"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="addressNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Número do Endereço
        </label>
        <input
          type="text"
          id="addressNumber"
          name="addressNumber"
          value={formData.addressNumber}
          onChange={handleInputChange}
          placeholder="Número do Endereço"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="unitNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Número da Unidade
        </label>
        <input
          type="text"
          id="unitNumber"
          name="unitNumber"
          value={formData.unitNumber}
          onChange={handleInputChange}
          placeholder="Número da Unidade"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo de Imóvel
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione o tipo de imóvel</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Kitnet">Kitnet</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="squareMeter"
          className="block text-sm font-medium text-gray-700"
        >
          Área em m²
        </label>
        <input
          type="text"
          id="squareMeter"
          name="squareMeter"
          value={formData.squareMeter}
          onChange={handleInputChange}
          placeholder="Área em m²"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="rooms"
          className="block text-sm font-medium text-gray-700"
        >
          Número de Quartos
        </label>
        <input
          type="text"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleInputChange}
          placeholder="Número de Quartos"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="garage"
          className="block text-sm font-medium text-gray-700"
        >
          Vagas de Garagem
        </label>
        <input
          type="text"
          id="garage"
          name="garage"
          value={formData.garage}
          onChange={handleInputChange}
          placeholder="Vagas de Garagem"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="neighborhood"
          className="block text-sm font-medium text-gray-700"
        >
          Bairro
        </label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleInputChange}
          placeholder="Bairro"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          Cidade
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Cidade"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700"
        >
          Estado
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="Estado"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="zipcode"
          className="block text-sm font-medium text-gray-700"
        >
          CEP
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleInputChange}
          placeholder="CEP"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="available"
          className="block text-sm font-medium text-gray-700"
        >
          Disponível
        </label>
        <select
          id="available"
          name="available"
          value={formData.available}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        >
          <option value="sim">Sim</option>
          <option value="não">Não</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="rentValue"
          className="block text-sm font-medium text-gray-700"
        >
          Valor do Aluguel
        </label>
        <input
          type="text"
          id="rentValue"
          name="rentValue"
          value={formData.rentValue}
          onChange={handleInputChange}
          placeholder="Valor do Aluguel"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="condominium"
          className="block text-sm font-medium text-gray-700"
        >
          Condomínio
        </label>
        <input
          type="text"
          id="condominium"
          name="condominium"
          value={formData.condominium}
          onChange={handleInputChange}
          placeholder="Condomínio"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="waterTax"
          className="block text-sm font-medium text-gray-700"
        >
          Taxa de Água
        </label>
        <input
          type="text"
          id="waterTax"
          name="waterTax"
          value={formData.waterTax}
          onChange={handleInputChange}
          placeholder="Taxa de Água"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="electricityTax"
          className="block text-sm font-medium text-gray-700"
        >
          Taxa de Eletricidade
        </label>
        <input
          type="text"
          id="electricityTax"
          name="electricityTax"
          value={formData.electricityTax}
          onChange={handleInputChange}
          placeholder="Taxa de Eletricidade"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="internetTax"
          className="block text-sm font-medium text-gray-700"
        >
          Taxa de Internet
        </label>
        <input
          type="text"
          id="internetTax"
          name="internetTax"
          value={formData.internetTax}
          onChange={handleInputChange}
          placeholder="Taxa de Internet"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="imgUrl"
          className="block text-sm font-medium text-gray-700"
        >
          URLs das Imagens (separadas por vírgula)
        </label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={
            Array.isArray(formData.imgUrl) ? formData.imgUrl.join(", ") : ""
          }
          onChange={(e) => {
            const imgUrls = e.target.value.split(",").map((url) => url.trim());
            setFormData({ ...formData, imgUrl: imgUrls });
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Checkboxes para availableItems */}
      <div className="space-y-2">
        <h4 className="font-semibold">Itens Disponíveis</h4>
        {availableItemsOptions.map((item) => (
          <label key={item} className="block">
            <input
              type="checkbox"
              checked={formData.availableItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cadastrar Imóvel
      </button>
    </form>
  );
};

export default UnitForm;
