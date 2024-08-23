import { useState } from "react";

const LocatarioForm = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [identidade, setIdentidade] = useState("");
  const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [renda, setRenda] = useState("");
  const [documentos, setDocumentos] = useState({
    identidade: null,
    cpf: null,
    renda: null,
    residencia: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setDocumentos((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // Aqui é onde você coloca o código do handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nomeCompleto", nomeCompleto);
    formData.append("identidade", identidade);
    formData.append("orgaoExpedidor", orgaoExpedidor);
    formData.append("cpf", cpf);
    formData.append("endereco", endereco);
    formData.append("nacionalidade", nacionalidade);
    formData.append("estadoCivil", estadoCivil);
    formData.append("dataNascimento", dataNascimento);
    formData.append("renda", renda);
    formData.append("identidadeArquivo", documentos.identidade);
    formData.append("cpfArquivo", documentos.cpf);
    formData.append("rendaArquivo", documentos.renda);
    formData.append("residenciaArquivo", documentos.residencia);

    // Enviar os dados para a API
    const response = await fetch("/api/locatarios", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Sucesso, você pode redirecionar ou mostrar uma mensagem
      console.log("Locatário cadastrado com sucesso!");
    } else {
      // Tratar erros
      console.error("Erro ao cadastrar locatário.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-6">Cadastro de Locatário</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Nome Completo</label>
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Identidade (RG)</label>
        <input
          type="text"
          value={identidade}
          onChange={(e) => setIdentidade(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Órgão Expedidor</label>
        <input
          type="text"
          value={orgaoExpedidor}
          onChange={(e) => setOrgaoExpedidor(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">CPF</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Endereço de Referência</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Nacionalidade</label>
        <input
          type="text"
          value={nacionalidade}
          onChange={(e) => setNacionalidade(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Estado Civil</label>
        <input
          type="text"
          value={estadoCivil}
          onChange={(e) => setEstadoCivil(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Data de Nascimento</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Renda</label>
        <input
          type="number"
          value={renda}
          onChange={(e) => setRenda(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Anexar Identidade</label>
        <input
          type="file"
          name="identidade"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Anexar CPF</label>
        <input
          type="file"
          name="cpf"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Anexar Comprovante de Renda
        </label>
        <input
          type="file"
          name="renda"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Anexar Comprovante de Residência
        </label>
        <input
          type="file"
          name="residencia"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Cadastrar Locatário
      </button>
    </form>
  );
};

export default LocatarioForm;
