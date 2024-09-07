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
    // Adicionando as propriedades faltantes
    idUnitIntended: 0, // Inicializando
    createdAt: new Date(), // Inicializando com a data atual
    updatedAt: new Date(), // Inicializando com a data atual
    lastLogin: new Date(), // Inicializando com a data atual
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
        // Resetando as propriedades faltantes
        idUnitIntended: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date(),
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
      {/* Todos os campos de input continuam aqui */}
      {/* Nome do Locatário, E-mail, Telefone, Endereço, CPF, etc. */}

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
