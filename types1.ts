// Definição dos tipos para a tabela Unit
export interface Unit {
  idUnit: number; // Chave primária autoincrementável
  address: string; // Endereço
  addressNumber: string; // Número do endereço
  unitNumber: string; // Número da unidade
  type: string; // Tipo de unidade
  squareMeter: number; // Metragem quadrada com 2 casas decimais
  rooms: number; // Número de quartos
  garage: number; // Número de vagas na garagem
  floor: number; // Número do andar
  neighborhood: string; // Bairro
  city: string; // Cidade
  state: string; // Estado
  zipcode: string; // CEP
  available: boolean; // Disponibilidade (TRUE ou FALSE)
  rentValue: number; // Valor do aluguel com 2 casas decimais
  condominium: number; // Taxa de condomínio com 2 casas decimais
  waterTax: number; // Taxa de água com 2 casas decimais
  electricityTax: number; // Taxa de eletricidade com 2 casas decimais
  internetTax: number; // Taxa de internet com 2 casas decimais
  depositValue: number; // Valor do depósito
  maintenanceFee: number; // Taxa de manutenção
  lastMaintenanceDate: Date; // Data da última manutenção
  imgUrl: string[]; // Array de URLs de imagem
  securityFeatures: string[]; // Lista de recursos de segurança
  accessInstructions: string; // Instruções de acesso ao imóvel
  documents: string[]; // Array de URLs para documentos digitalizados
  averageRating: number; // Classificação média do imóvel
  petAllowed: boolean; // Indica se animais de estimação são permitidos
  smokingAllowed: boolean; // Indica se é permitido fumar no imóvel
  listingStatus: string; // Status do imóvel
  highlighted: boolean; // Indica se o imóvel está destacado
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data da última atualização
  description: string; // Descrição do imóvel
  features: string[]; // Características especiais do imóvel
  furnished: boolean; // Indica se o imóvel é mobiliado
  leaseStartDate: Date; // Data de início do contrato de locação
  leaseEndDate: Date; // Data de término do contrato de locação
  currentTenantId: number; // ID do locatário atual
  rentalContractId: number; // ID do contrato de aluguel
}

// Definição dos tipos para a tabela RentalHistory
export interface RentalHistory {
  id: number; // Chave primária autoincrementável para a tabela RentalHistory
  unitId: number; // Chave estrangeira que referencia a tabela Unit
  tenantId: number; // ID do locatário
  startDate: Date; // Data de início da locação
  endDate: Date; // Data de término da locação
  feedback: string; // Feedback do inquilino
}

// Definição dos tipos para a tabela Renter
export interface Renter {
  idRenter: number; // Chave primária autoincrementável
  nameRenter: string; // Nome do locatário
  emailRenter: string; // E-mail do locatário
  phoneRenter: string; // Telefone do locatário
  addressRenter: string; // Endereço do locatário
  cpfRenter: bigint; // CPF do locatário
  idtRenter: bigint; // Identidade do locatário
  idtSenderRenter: string; // Órgão emissor da identidade
  maritalStatusRenter: string; // Estado civil do locatário
  birthdateRenter: Date; // Data de nascimento do locatário
  ciaWorksRenter: string; // Empresa onde o locatário trabalha
  admissionDataRenter: Date; // Data de admissão na empresa
  salaryRenter: number; // Salário do locatário
  idUnitIntended: number; // Unidade pretendida para locação
  bankAccount: string; // Conta bancária do locatário
  paymentMethod: string; // Método preferido de pagamento
  creditScore: number; // Pontuação de crédito do locatário
  preferredContactMethod: string; // Método preferido de contato
  newsletterSubscribed: boolean; // Inscrição para newsletter
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data da última atualização
  lastLogin: Date; // Data e hora do último login
  documentURL: string[]; // URLs para documentos digitalizados
  emergencyContactName: string; // Nome do contato de emergência
  emergencyContactRelationship: string; // Relacionamento com o contato de emergência
  emergencyContactPhone: string; // Telefone do contato de emergência
}

// Definição dos tipos para a tabela Item
export interface Item {
  idItem: number; // Chave primária autoincrementável para a tabela Item
  name: string; // Nome do item
}

// Definição dos tipos para a tabela UnitItem
export interface UnitItem {
  idUnitItem: number; // Chave primária autoincrementável para a tabela de junção
  unitId: number; // Chave estrangeira que referencia a tabela Unit
  itemId: number; // Chave estrangeira que referencia a tabela Item
}

// Definição dos tipos para a tabela RentalContract
export interface RentalContract {
  idContract: number; // Chave primária autoincrementável
  unitId: number; // Chave estrangeira que referencia a tabela Unit
  renterId: number; // Chave estrangeira que referencia a tabela Renter
  startDate: Date; // Data de início do contrato
  endDate: Date; // Data de término do contrato
  contractTerms: string; // Termos e condições do contrato
  monthlyRent: number; // Valor mensal do aluguel
  securityDeposit: number; // Valor do depósito de segurança
  status: string; // Status do contrato
  renewalOption: boolean; // Opção de renovação automática
  penaltyTerms: string; // Termos de penalidade por quebra de contrato
  notes: string; // Notas adicionais sobre o contrato
}

// Definição dos tipos para a tabela Payment
export interface Payment {
  idPayment: number; // Chave primária autoincrementável
  contractId: number; // Chave estrangeira que referencia a tabela RentalContract
  paymentDate: Date; // Data do pagamento
  amount: number; // Valor do pagamento
  paymentMethod: string; // Método de pagamento
  paymentStatus: string; // Status do pagamento
  dueDate: Date; // Data de vencimento do pagamento
  lateFee: number; // Taxa de atraso para pagamentos em atraso
  paymentReference: string; // Código de referência do pagamento
}

// Definição dos tipos para a tabela MaintenanceRequest
export interface MaintenanceRequest {
  idRequest: number; // Chave primária autoincrementável
  unitId: number; // Chave estrangeira que referencia a tabela Unit
  requestDate: Date; // Data do pedido de manutenção
  description: string; // Descrição do problema ou solicitação de manutenção
  status: string; // Status da solicitação
  assignedTo: string; // Técnico ou empresa de manutenção responsável
  completionDate: Date; // Data de conclusão da manutenção
  priority: string; // Nível de prioridade
  estimatedCost: number; // Custo estimado da manutenção
  actualCost: number; // Custo real da manutenção
}

// Definição dos tipos para a tabela User
export interface User {
  idUser: number; // Chave primária autoincrementável
  username: string; // Nome de usuário
  passwordHash: string; // Hash da senha
  email: string; // Endereço de e-mail
  role: string; // Papel do usuário
  createdAt: Date; // Data de criação do usuário
  updatedAt: Date; // Data da última atualização
  phoneNumber: string; // Número de telefone do usuário
  address: string; // Endereço do usuário
  status: string; // Status da conta do usuário
}

// Definição dos tipos para a tabela Notification
export interface Notification {
  idNotification: number; // Chave primária autoincrementável
  userId: number; // Chave estrangeira que referencia a tabela User
  message: string; // Conteúdo da notificação
  status: string; // Status da notificação
  createdAt: Date; // Data de criação da notificação
  notificationType: string; // Tipo de notificação
  readAt: Date; // Data e hora em que a notificação foi lida
}
