// components/UnitForm.tsx
import { useState } from "react";
import axios from "axios";

const UnitForm: React.FC = () => {
  const [formData, setFormData] = useState({
    idUnit: "",
    address: "",
    number: "",
    unit: "",
    type: "",
    squareMeter: "",
    rooms: "",
    garage: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    available: "",
    rentValue: "",
    condominium: "",
    waterTax: "",
    electricityTax: "",
    internetTax: "",
    imgUrl: [] as File[], // Mantém os arquivos
    availableItems: "",
    renters: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        imgUrl: Array.from(files), // Converte FileList para um array de File
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    // Adiciona campos de texto
    Object.keys(formData).forEach((key) => {
      if (key === "imgUrl") {
        formData.imgUrl.forEach((file) => {
          form.append("imgUrl", file);
        });
      } else if (key === "availableItems" || key === "renters") {
        // Converte arrays de strings em uma única string separada por vírgulas
        form.append(
          key,
          (formData[key as keyof typeof formData] as string) || ""
        );
      } else {
        form.append(key, formData[key as keyof typeof formData] as string);
      }
    });

    try {
      await axios.post("/api/units", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Unit added successfully!");
    } catch (error) {
      console.error("Error adding unit:", error);
      alert("Failed to add unit.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="idUnit"
        placeholder="ID Unit"
        value={formData.idUnit}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="number"
        placeholder="Number"
        value={formData.number}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="unit"
        placeholder="Unit"
        value={formData.unit}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="squareMeter"
        placeholder="Square Meter"
        value={formData.squareMeter}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="rooms"
        placeholder="Rooms"
        value={formData.rooms}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="garage"
        placeholder="Garage"
        value={formData.garage}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="neighborhood"
        placeholder="Neighborhood"
        value={formData.neighborhood}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="zipcode"
        placeholder="Zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="available"
        placeholder="Available"
        value={formData.available}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="rentValue"
        placeholder="Rent Value"
        value={formData.rentValue}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="condominium"
        placeholder="Condominium"
        value={formData.condominium}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="waterTax"
        placeholder="Water Tax"
        value={formData.waterTax}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="electricityTax"
        placeholder="Electricity Tax"
        value={formData.electricityTax}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        name="internetTax"
        placeholder="Internet Tax"
        value={formData.internetTax}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        name="availableItems"
        placeholder="Available Items (comma separated)"
        value={formData.availableItems}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        name="renters"
        placeholder="Renters (comma separated)"
        value={formData.renters}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default UnitForm;
