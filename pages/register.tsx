// pages/register.tsx
import Header from "@/components/Header";
import { useState } from "react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nameRenter: "",
    emailRenter: "",
    phoneRenter: "",
    addressRenter: "",
    addressNumber: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    cpfRenter: "",
    idtRenter: "",
    idtSenderRenter: "",
    maritalStatusRenter: "",
    birthdateRenter: "",
    ciaWorksRenter: "",
    admissionDataRenter: "",
    salaryRenter: "",
    idUnitIntended: "",
    bankAccount: "",
    paymentMethod: "",
    creditScore: "",
    preferredContactMethod: "",
    newsletterSubscribed: false,
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    documents: { identity: null, payslip: null, proofOfAddress: null },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files) {
      setFormData({
        ...formData,
        documents: { ...formData.documents, [name]: e.target.files[0] },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto">
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6">Informações do Locatário</h2>

        {/* Nome Completo */}
        <div className="mb-4">
          <label className="block text-gray-700">Nome Completo</label>
          <input
            type="text"
            name="nameRenter"
            value={formData.nameRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="emailRenter"
            value={formData.emailRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label className="block text-gray-700">Telefone</label>
          <input
            type="tel"
            name="phoneRenter"
            value={formData.phoneRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Endereço */}
        <div className="mb-4">
          <label className="block text-gray-700">Endereço</label>
          <input
            type="text"
            name="addressRenter"
            value={formData.addressRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Número, Bairro, Cidade, Estado, CEP */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Número</label>
            <input
              type="text"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Bairro</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Estado</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">CEP</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
        </div>

        {/* CPF */}
        <div className="mb-4">
          <label className="block text-gray-700">CPF</label>
          <input
            type="text"
            name="cpfRenter"
            value={formData.cpfRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Identidade */}
        <div className="mb-4">
          <label className="block text-gray-700">Identidade (RG)</label>
          <input
            type="text"
            name="idtRenter"
            value={formData.idtRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Órgão Emissor */}
        <div className="mb-4">
          <label className="block text-gray-700">Órgão Emissor</label>
          <input
            type="text"
            name="idtSenderRenter"
            value={formData.idtSenderRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Estado Civil */}
        <div className="mb-4">
          <label className="block text-gray-700">Estado Civil</label>
          <select
            name="maritalStatusRenter"
            value={formData.maritalStatusRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          >
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="divorciado">Viúvo(a)</option>
          </select>
        </div>

        {/* Data de Nascimento */}
        <div className="mb-4">
          <label className="block text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            name="birthdateRenter"
            value={formData.birthdateRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Empresa e Data de Admissão */}
        <div className="mb-4">
          <label className="block text-gray-700">Empresa onde trabalha</label>
          <input
            type="text"
            name="ciaWorksRenter"
            value={formData.ciaWorksRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Admissão</label>
          <input
            type="date"
            name="admissionDataRenter"
            value={formData.admissionDataRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Salário */}
        <div className="mb-4">
          <label className="block text-gray-700">Salário</label>
          <input
            type="number"
            name="salaryRenter"
            value={formData.salaryRenter}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Contato de Emergência */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Nome do Contato de Emergência
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Relacionamento com Contato de Emergência
          </label>
          <input
            type="text"
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Telefone do Contato de Emergência
          </label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Upload de Documentos */}
        <div className="mb-4">
          <label className="block text-gray-700">Identidade (Upload)</label>
          <input
            type="file"
            name="identity"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contracheque</label>
          <input
            type="file"
            name="payslip"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Comprovante de Residência
          </label>
          <input
            type="file"
            name="proofOfAddress"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="mt-1 p-2 border w-full rounded"
            required
          />
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enviar Cadastro
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
