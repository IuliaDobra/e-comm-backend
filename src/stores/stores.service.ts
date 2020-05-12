import { Injectable } from '@nestjs/common';
import { Store } from './store.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';

@Injectable()
export class StoresService {
  private stores: Store[] = [];

  getAllStores(): Store[] {
    return this.stores;
  }

  getStoresWithFilters(filterDto: GetStoreFilterDto): Store[] {
    const { search } = filterDto;

    let stores = this.getAllStores();

    if (search) {
      stores = stores.filter( store =>
        store.name.includes(search) ||
        store.address.includes(search) ||
        store.cui.includes(search) ||
        store.reg_number.includes(search) ||
        store.phone_number.includes(search) ||
        store.e_mail.includes(search)
      );
    }

    return stores;
  }

  getStoreById(id: string): Store {
    return this.stores.find(store => store.id === id);
  }

  createStore(createStoreDto: CreateStoreDto): Store {
    const { name, address, cui, reg_number, iban, bank, phone_number, e_mail} = createStoreDto;
    const store: Store = {
      id: uuidv4(),
      name,
      address,
      cui,
      reg_number,
      iban,
      bank,
      phone_number,
      e_mail,
      products: [],
      orders: []
    }
    this.stores.push(store);
    return store;
  }

  deleteStore(id: string): void {
    this.stores = this.stores.filter(store => store.id !== id);
  }

  updateStore(id: string, updateStoreDto: UpdateStoreDto): Store {
    const { address, iban, bank, phone_number, e_mail } = updateStoreDto;
    const store: Store = this.getStoreById(id);
    store.address = address;
    store.iban = iban;
    store.bank = bank;
    store.phone_number = phone_number;
    store.e_mail = e_mail;
    console.log(store);
    return store;
  }
}
