import React, { useState, useEffect } from "react";
import { Unit, Feature } from "../types";
import { fetchFeatures } from "../utils/api"; // Certifique-se de que este caminho esteja correto

const UnitForm: React.FC = () => {
  const [formData, setFormData] = useState<Unit>({
    idUnit: 0,
    address: "",
    addressNumber: "",
    unitNumber: "",
    type: "",
    squareMeter: 0,
    rooms: 0,
    garage: 0,
    floor: 0,
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    available: false,
    rentValue: 0,
    condominium: 0,
    waterTax: 0,
    electricityTax: 0,
    internetTax: 0,
    depositValue: 0,
    maintenanceFee: 0,
    lastMaintenanceDate: null,
    imgUrl: [],
    securityFeatures: [],
    accessInstructions: "",
    documents: [],
    averageRating: null,
    petAllowed: false,
    smokingAllowed: false,
    listingStatus: "",
    highlighted: false,
    description: "",
    features: [],
    furnished: false,
    leaseStartDate: null,
    leaseEndDate: null,
    currentTenantId: null,
    rentalContractId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const loadFeatures = async () => {
      const fetchedFeatures = await fetchFeatures();
      setFeatures(fetchedFeatures);
    };

    loadFeatures();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value ? new Date(value) : null,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Unit
  ) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: checked,
    }));
  };

  const handleCheckboxArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "securityFeatures" | "features"
  ) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedArray = checked
        ? [...prevState[fieldName], value]
        : prevState[fieldName].filter((item) => item !== value);
      return { ...prevState, [fieldName]: updatedArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      {/* Campos do formulário para todos os atributos da entidade Unit */}

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
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="squareMeter"
          className="block text-sm font-medium text-gray-700"
        >
          Área (m²)
        </label>
        <input
          type="number"
          id="squareMeter"
          name="squareMeter"
          value={formData.squareMeter}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="rooms"
          className="block text-sm font-medium text-gray-700"
        >
          Quartos
        </label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleNumberChange}
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
          type="number"
          id="garage"
          name="garage"
          value={formData.garage}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="floor"
          className="block text-sm font-medium text-gray-700"
        >
          Andar
        </label>
        <input
          type="number"
          id="floor"
          name="floor"
          value={formData.floor}
          onChange={handleNumberChange}
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
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={formData.available}
          onChange={(e) => handleCheckboxChange(e, "available")}
          className="mr-2"
        />
      </div>

      <div>
        <label
          htmlFor="rentValue"
          className="block text-sm font-medium text-gray-700"
        >
          Valor do Aluguel
        </label>
        <input
          type="number"
          id="rentValue"
          name="rentValue"
          value={formData.rentValue}
          onChange={handleNumberChange}
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
          type="number"
          id="condominium"
          name="condominium"
          value={formData.condominium}
          onChange={handleNumberChange}
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
          type="number"
          id="waterTax"
          name="waterTax"
          value={formData.waterTax}
          onChange={handleNumberChange}
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
          type="number"
          id="electricityTax"
          name="electricityTax"
          value={formData.electricityTax}
          onChange={handleNumberChange}
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
          type="number"
          id="internetTax"
          name="internetTax"
          value={formData.internetTax}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="depositValue"
          className="block text-sm font-medium text-gray-700"
        >
          Valor do Depósito
        </label>
        <input
          type="number"
          id="depositValue"
          name="depositValue"
          value={formData.depositValue}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="maintenanceFee"
          className="block text-sm font-medium text-gray-700"
        >
          Taxa de Manutenção
        </label>
        <input
          type="number"
          id="maintenanceFee"
          name="maintenanceFee"
          value={formData.maintenanceFee}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="lastMaintenanceDate"
          className="block text-sm font-medium text-gray-700"
        >
          Data da Última Manutenção
        </label>
        <input
          type="date"
          id="lastMaintenanceDate"
          name="lastMaintenanceDate"
          value={
            formData.lastMaintenanceDate
              ? formData.lastMaintenanceDate.toISOString().split("T")[0]
              : ""
          }
          onChange={handleDateChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
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
          value={formData.imgUrl.join(", ")}
          onChange={(e) => {
            const imgUrls = e.target.value.split(",").map((url) => url.trim());
            setFormData({ ...formData, imgUrl: imgUrls });
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="accessInstructions"
          className="block text-sm font-medium text-gray-700"
        >
          Instruções de Acesso
        </label>
        <textarea
          id="accessInstructions"
          name="accessInstructions"
          value={formData.accessInstructions}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="documents"
          className="block text-sm font-medium text-gray-700"
        >
          URLs de Documentos (separadas por vírgula)
        </label>
        <input
          type="text"
          id="documents"
          name="documents"
          value={formData.documents.join(", ")}
          onChange={(e) => {
            const docs = e.target.value.split(",").map((doc) => doc.trim());
            setFormData({ ...formData, documents: docs });
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="averageRating"
          className="block text-sm font-medium text-gray-700"
        >
          Avaliação Média
        </label>
        <input
          type="number"
          id="averageRating"
          name="averageRating"
          value={formData.averageRating ?? ""}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="petAllowed"
          className="block text-sm font-medium text-gray-700"
        >
          Permite Animais de Estimação
        </label>
        <input
          type="checkbox"
          id="petAllowed"
          name="petAllowed"
          checked={formData.petAllowed}
          onChange={(e) => handleCheckboxChange(e, "petAllowed")}
          className="mr-2"
        />
      </div>

      <div>
        <label
          htmlFor="smokingAllowed"
          className="block text-sm font-medium text-gray-700"
        >
          Permite Fumar
        </label>
        <input
          type="checkbox"
          id="smokingAllowed"
          name="smokingAllowed"
          checked={formData.smokingAllowed}
          onChange={(e) => handleCheckboxChange(e, "smokingAllowed")}
          className="mr-2"
        />
      </div>

      <div>
        <label
          htmlFor="listingStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Status do Imóvel
        </label>
        <input
          type="text"
          id="listingStatus"
          name="listingStatus"
          value={formData.listingStatus}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="highlighted"
          className="block text-sm font-medium text-gray-700"
        >
          Destaque
        </label>
        <input
          type="checkbox"
          id="highlighted"
          name="highlighted"
          checked={formData.highlighted}
          onChange={(e) => handleCheckboxChange(e, "highlighted")}
          className="mr-2"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Características Especiais */}
      <div>
        <h4 className="block text-sm font-medium text-gray-700">
          Características Especiais
        </h4>
        {features.length > 0 ? (
          features.map((feature) => (
            <label key={feature.id} className="flex items-center">
              <input
                type="checkbox"
                value={feature.id}
                checked={formData.features.includes(feature.id)}
                onChange={(e) => handleCheckboxArrayChange(e, "features")}
                className="mr-2"
              />
              {feature.name}
            </label>
          ))
        ) : (
          <p>Nenhuma característica especial disponível.</p>
        )}
      </div>

      <div>
        <label
          htmlFor="furnished"
          className="block text-sm font-medium text-gray-700"
        >
          Mobiliado
        </label>
        <input
          type="checkbox"
          id="furnished"
          name="furnished"
          checked={formData.furnished}
          onChange={(e) => handleCheckboxChange(e, "furnished")}
          className="mr-2"
        />
      </div>

      <div>
        <label
          htmlFor="leaseStartDate"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Início do Contrato
        </label>
        <input
          type="date"
          id="leaseStartDate"
          name="leaseStartDate"
          value={
            formData.leaseStartDate
              ? formData.leaseStartDate.toISOString().split("T")[0]
              : ""
          }
          onChange={handleDateChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="leaseEndDate"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Término do Contrato
        </label>
        <input
          type="date"
          id="leaseEndDate"
          name="leaseEndDate"
          value={
            formData.leaseEndDate
              ? formData.leaseEndDate.toISOString().split("T")[0]
              : ""
          }
          onChange={handleDateChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="currentTenantId"
          className="block text-sm font-medium text-gray-700"
        >
          ID do Locatário Atual
        </label>
        <input
          type="number"
          id="currentTenantId"
          name="currentTenantId"
          value={formData.currentTenantId ?? ""}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="rentalContractId"
          className="block text-sm font-medium text-gray-700"
        >
          ID do Contrato de Aluguel
        </label>
        <input
          type="number"
          id="rentalContractId"
          name="rentalContractId"
          value={formData.rentalContractId ?? ""}
          onChange={handleNumberChange}
          className="border p-2 rounded w-full"
        />
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
