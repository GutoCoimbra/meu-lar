// types.ts

export interface Unit {
  idUnit: number; // Altere para number, se necessário
  address: string;
  addressNumber: string;
  unitNumber: string;
  type: string;
  squareMeter: string;
  rooms: string;
  garage: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  available: "sim" | "não"; // Tipo restrito a 'sim' ou 'não'
  rentValue: string;
  condominium: string;
  waterTax: string;
  electricityTax: string;
  internetTax: string;
  imgUrl: string[];
  availableItems: string[];
  renters: number[];
}

export interface Renter {
  idRenter: number;
  nameRenter: string;
  emailRenter: string;
  phoneRenter: string;
  addressRenter: string;
  cpfRenter: number;
  idtRenter: number;
  idtSenderRenter: string;
  maritalStatusRenter: string;
  birthdateRenter: string;
  ciaWorksRenter: string;
  admissionDataRenter: string;
  salaryRenter: number;
  idUnitIntended: number;
}
// rentalStartDateRenter: string;
//   rentalEndDateRenter: string;
