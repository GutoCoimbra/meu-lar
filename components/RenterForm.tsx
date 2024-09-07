import React, { useState } from "react";
import { Renter } from "../types";

const RenterForm: React.FC = () => {
  const [formData, setFormData] = useState<Renter>({
    idRenter: 0,
    nameRenter: "",
    emailRenter: "",
    phoneRenter: "",
    addressRenter: "",
    cpfRenter: BigInt(0), // Inicializando como BigInt
    idtRenter: BigInt(0), // Inicializando como BigInt
    idtSenderRenter: "",
    maritalStatusRenter: "",
    birthdateRenter: new Date(), // Inicializando como Date
    ciaWorksRenter: "",
    admissionDataRenter: new Date(), // Inicializando como Date
    salaryRenter: 0,
    bankAccount: "",
    paymentMethod: "",
    creditScore: 0,
    preferredContactMethod: "",
    newsletterSubscribed: false,
    documentURL: [],
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "salaryRenter" || name === "creditScore"
          ? Number(value)
          : name === "cpfRenter" || name === "idtRenter"
          ? BigInt(value) // Convertendo para BigInt
          : name === "birthdateRenter" || name === "admissionDataRenter"
          ? new Date(value) // Convertendo para Date
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serializedData = {
      ...formData,
      cpfRenter: formData.cpfRenter.toString(),
      idtRenter: formData.idtRenter.toString(),
      birthdateRenter: formData.birthdateRenter.toISOString(),
      admissionDataRenter: formData.admissionDataRenter.toISOString(),
    };

    try {
      const response = await fetch("/api/renters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serializedData),
      });

      if (!response.ok) {
        throw new Error("Failed to add renter");
      }

      console.log("Renter added successfully");

      setFormData({
        idRenter: 0,
        nameRenter: "",
        emailRenter: "",
        phoneRenter: "",
        addressRenter: "",
        cpfRenter: BigInt(0), // Resetando para BigInt
        idtRenter: BigInt(0), // Resetando para BigInt
        idtSenderRenter: "",
        maritalStatusRenter: "",
        birthdateRenter: new Date(), // Resetando para Date
        ciaWorksRenter: "",
        admissionDataRenter: new Date(), // Resetando para Date
        salaryRenter: 0,
        bankAccount: "",
        paymentMethod: "",
        creditScore: 0,
        preferredContactMethod: "",
        newsletterSubscribed: false,
        documentURL: [],
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactPhone: "",
      });
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
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
          type="text"
          name="cpfRenter"
          value={formData.cpfRenter.toString()} // Convertendo BigInt para string para exibição
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
          type="text"
          name="idtRenter"
          value={formData.idtRenter.toString()} // Convertendo BigInt para string para exibição
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
          value={formData.birthdateRenter.toISOString().substring(0, 10)} // Formatando a data para exibição
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
          value={formData.admissionDataRenter.toISOString().substring(0, 10)} // Formatando a data para exibição
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

      {/* Contato de Emergência - Nome */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nome do Contato de Emergência:
        </label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Contato de Emergência - Relacionamento */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Relacionamento do Contato de Emergência:
        </label>
        <input
          type="text"
          name="emergencyContactRelationship"
          value={formData.emergencyContactRelationship}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Contato de Emergência - Telefone */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Telefone do Contato de Emergência:
        </label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
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
