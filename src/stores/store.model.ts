export interface Store {
  id: string;
  name: string;
  address: string;
  cui: string;
  reg_number: string;
  iban: string;
  bank: string;
  phone_number: string;
  e_mail: string;
  products: Array<any>;
  orders: Array<any>;
}
