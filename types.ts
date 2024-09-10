// Definição dos tipos para a tabela Unit
export interface Unit {
  idUnit: number;
  address: string;
  addressNumber: string;
  unitNumber: string;
  typeId?: number | null;
  typeName?: string; // Novo campo para o nome do tipo
  squareMeter: number;
  rooms: number;
  bathroom: number;
  garage: number;
  floor: number;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  available: boolean;
  availableItems: string[];
  elevator: boolean;
  rentValue: number;
  condominium: number;
  waterTax: number;
  electricityTax: number;
  internetTax: number;
  depositValue: number;
  maintenanceFee: number;
  lastMaintenanceDate?: Date | null;
  imgUrl: string | string[];
  accessInstructions: string;
  documents: string[];
  averageRating?: number | null;
  petAllowed: boolean;
  smokingAllowed: boolean;
  listingStatus: string;
  highlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  features: string[];
  furnished: boolean;
  leaseStartDate?: Date | null;
  leaseEndDate?: Date | null;
  currentTenantId?: number | null;
  rentalContractId?: number | null;
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

export interface Feature {
  id: string;
  name: string;
}
