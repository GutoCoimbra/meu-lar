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
  name: string;
  email: string;
  phone: string;
  rentalStartDate: string;
  rentalEndDate: string;
}

export default Unit;
