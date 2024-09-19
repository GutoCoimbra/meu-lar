import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Renter } from "../types";
import { supabase } from "../utils/supabaseClient";
import { uploadFileToFolder } from "../utils/uploadFile";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [renterId, setRenterId] = useState<number | null>(null); // Armazena o idRenter
  const [formData, setFormData] = useState<Renter>({
    idRenter: 0,
    uuid: "",
    nameRenter: "",
    emailRenter: "",
    phoneRenter: "",
    addressRenter: "",
    addressNumber: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    cpfRenter: BigInt(0),
    idtRenter: BigInt(0),
    idtSenderRenter: "",
    maritalStatusRenter: "",
    birthdateRenter: new Date(),
    ciaWorksRenter: "",
    admissionDataRenter: new Date(),
    salaryRenter: 0,
    idUnitIntended: 0,
    bankAccount: "",
    paymentMethod: "",
    creditScore: 0,
    preferredContactMethod: "",
    newsletterSubscribed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    documentURL: [],
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
  });

  // Obtém a sessão e verifica se o usuário está autenticado
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/register"); // Redireciona para a página de login NextAuth se não estiver logado
    } else if (session && session.user?.email) {
      console.log("Dados da sessão:", session);
      // Preenche o email e o UUID automaticamente
      setFormData((prevData) => ({
        ...prevData,
        emailRenter: session.user.email || "",
        uuid: session.user.id || "",
      }));
    }
  }, [status, session, router]);

  // Carregar dados do locatário existente (caso já tenha sido salvo antes)
  const loadRenterData = async (idRenter: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Renter")
      .select("*")
      .eq("idRenter", idRenter)
      .single();
    if (error) {
      console.error("Erro ao carregar os dados:", error.message);
    } else {
      setFormData(data as Renter);
    }
    setLoading(false);
  };

  // Salvar dados parciais (após cada etapa)
  const saveData = async () => {
    setLoading(true);
    try {
      // Sanitiza os dados antes de enviar para o Supabase
      const sanitizedData = {
        ...formData,
        cpfRenter:
          formData.cpfRenter.toString() === "" ? null : formData.cpfRenter,
        idtRenter:
          formData.idtRenter.toString() === "" ? null : formData.idtRenter,
        salaryRenter:
          formData.salaryRenter === 0 || isNaN(formData.salaryRenter)
            ? null
            : formData.salaryRenter,
        idUnitIntended: isNaN(formData.idUnitIntended)
          ? null
          : formData.idUnitIntended,
        // Adicione mais campos conforme necessário
      };

      const { data, error } = renterId
        ? await supabase
            .from("Renter")
            .update(sanitizedData)
            .eq("idRenter", renterId)
        : await supabase.from("Renter").insert(sanitizedData).select();

      if (error) throw error;

      if (!renterId && data) {
        setRenterId(data[0].idRenter); // Salva o idRenter após a primeira inserção
      }
    } catch (error: any) {
      console.error("Erro ao salvar os dados:", error.message);
    }
    setLoading(false);
  };

  // Função para tratar mudanças nos inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Verifica se o campo é numérico e garante que valores vazios sejam tratados corretamente
    if (
      type === "number" ||
      name === "cpfRenter" ||
      name === "idtRenter" ||
      name === "salaryRenter"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "" ? null : Number(value), // Converte string vazia para `null` ou valor numérico
      }));
    } else if (type === "date") {
      setFormData((prevData) => ({ ...prevData, [name]: new Date(value) }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Upload de arquivos
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = e.target.files?.[0];
    if (file && renterId) {
      const folder = `renter_${renterId}`; // Cria pasta com base no idRenter
      const publicUrl = await uploadFileToFolder(file, folder);
      if (publicUrl) {
        setFormData((prevData) => ({
          ...prevData,
          documentURL: [...(prevData.documentURL || []), publicUrl],
        }));
      }
    }
  };

  const nextStep = async () => {
    await saveData(); // Salva os dados antes de avançar para a próxima etapa
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    await saveData();
    alert("Cadastro concluído com sucesso!");
    router.push("/");
  };

  // Corrige o erro com datas ao garantir que o valor seja formatado corretamente
  const formatDate = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().substring(0, 10)
      : "";
  };

  // Renderiza o formulário completo com todos os campos de cada etapa
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Dados Gerais</h2>
            <label className="block text-gray-700">Nome completo</label>
            <input
              type="text"
              name="nameRenter"
              value={formData.nameRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="emailRenter"
              value={formData.emailRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              readOnly
              required
            />
            <label className="block text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              name="birthdateRenter"
              value={formatDate(formData.birthdateRenter)}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">Estado Civil</label>
            <select
              name="maritalStatusRenter"
              value={formData.maritalStatusRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecione</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="uniao_estavel">União Estável</option>
            </select>
            <label className="block text-gray-700">Identidade</label>
            <input
              type="text"
              name="idtRenter"
              value={formData.idtRenter.toString()}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">Órgão Emissor</label>
            <input
              type="text"
              name="idtSenderRenter"
              value={formData.idtSenderRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">CPF</label>
            <input
              type="text"
              name="cpfRenter"
              value={formData.cpfRenter.toString()}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Contatos</h2>
            <label className="block text-gray-700">Telefone</label>
            <input
              type="text"
              name="phoneRenter"
              value={formData.phoneRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />

            <label className="block text-gray-700">
              Nome da Pessoa de Referência
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">Grau de Parentesco</label>
            <input
              type="text"
              name="emergencyContactRelationship"
              value={formData.emergencyContactRelationship}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">
              Telefone da Pessoa de Referência
            </label>
            <input
              type="text"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Último Endereço de Residência
            </h2>
            <label className="block text-gray-700">Endereço</label>
            <input
              type="text"
              name="addressRenter"
              value={formData.addressRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">Número</label>
            <input
              type="text"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">Bairro</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">Estado</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">CEP</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Dados Profissionais</h2>
            <label className="block text-gray-700">Empresa onde trabalha</label>
            <input
              type="text"
              name="ciaWorksRenter"
              value={formData.ciaWorksRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <label className="block text-gray-700">Data de Admissão</label>
            <input
              type="date"
              name="admissionDataRenter"
              value={formatDate(formData.admissionDataRenter)}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <label className="block text-gray-700">Salário</label>
            <input
              type="number"
              step="0.01"
              name="salaryRenter"
              value={formData.salaryRenter}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Upload de Documentos</h2>
            <label className="block text-gray-700">Foto da Identidade</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "identity")}
            />
            <label className="block text-gray-700">
              Foto do Comprovante de Residência
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "residenceProof")}
            />
            <label className="block text-gray-700">Foto do Contracheque</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "payStub")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Cadastro de Locatário</h1>
      {loading ? <p>Carregando...</p> : renderStep()}
      <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Anterior
          </button>
        )}
        {currentStep < 5 && (
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Próximo
          </button>
        )}
        {currentStep === 5 && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Concluir Cadastro
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
