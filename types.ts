// types.ts

export interface Unit {
  idUnit: string;
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
  renters: string[];
}

export default Unit;
