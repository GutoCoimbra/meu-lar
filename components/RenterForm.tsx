import React, { useState } from "react";
import { Renter } from "../types";

const RenterForm: React.FC = () => {
  const [formData, setFormData] = useState<Renter>({
    idRenter: 0,
    nameRenter: "",
    emailRenter: "",
    phoneRenter: "",
    addressRenter: "",
    cpfRenter: 0,
    idtRenter: 0,
    idtSenderRenter: "",
    maritalStatusRenter: "",
    birthdateRenter: "",
    ciaWorksRenter: "",
    admissionDataRenter: "",
    salaryRenter: 0,
    idUnitIntended: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "salaryRenter" ||
        name === "cpfRenter" ||
        name === "idtRenter" ||
        name === "idRenter" ||
        name === "idUnitIntended"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/renters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Renter added successfully");
        setFormData({
          idRenter: 0,
          nameRenter: "",
          emailRenter: "",
          phoneRenter: "",
          addressRenter: "",
          cpfRenter: 0,
          idtRenter: 0,
          idtSenderRenter: "",
          maritalStatusRenter: "",
          birthdateRenter: "",
          ciaWorksRenter: "",
          admissionDataRenter: "",
          salaryRenter: 0,
          idUnitIntended: 0,
        });
      } else {
        console.error("Failed to add renter");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      {/* ID do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ID do Locatário:
        </label>
        <input
          type="number"
          name="idRenter"
          value={formData.idRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Nome do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nome:
        </label>
        <input
          type="text"
          name="nameRenter"
          value={formData.nameRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* E-mail do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          E-mail:
        </label>
        <input
          type="email"
          name="emailRenter"
          value={formData.emailRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Telefone do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Telefone:
        </label>
        <input
          type="tel"
          name="phoneRenter"
          value={formData.phoneRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Endereço do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Endereço:
        </label>
        <input
          type="text"
          name="addressRenter"
          value={formData.addressRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* CPF do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          CPF:
        </label>
        <input
          type="number"
          name="cpfRenter"
          value={formData.cpfRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Identidade do Locatário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Identidade:
        </label>
        <input
          type="number"
          name="idtRenter"
          value={formData.idtRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Órgão Emissor da Identidade */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Órgão Emissor:
        </label>
        <input
          type="text"
          name="idtSenderRenter"
          value={formData.idtSenderRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Estado Civil */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Estado Civil:
        </label>
        <input
          type="text"
          name="maritalStatusRenter"
          value={formData.maritalStatusRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Data de Nascimento */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Data de Nascimento:
        </label>
        <input
          type="date"
          name="birthdateRenter"
          value={formData.birthdateRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Empresa onde Trabalha */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Empresa onde Trabalha:
        </label>
        <input
          type="text"
          name="ciaWorksRenter"
          value={formData.ciaWorksRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Data de Admissão */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Data de Admissão:
        </label>
        <input
          type="date"
          name="admissionDataRenter"
          value={formData.admissionDataRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Salário */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Salário:
        </label>
        <input
          type="number"
          name="salaryRenter"
          value={formData.salaryRenter}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* ID da Unidade Desejada */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ID da Unidade Desejada:
        </label>
        <input
          type="number"
          name="idUnitIntended"
          value={formData.idUnitIntended}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Botão de Envio */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default RenterForm;
