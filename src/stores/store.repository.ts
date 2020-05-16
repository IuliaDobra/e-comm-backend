import { EntityRepository, Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store>{
  async createTask (createStoreDto: CreateStoreDto): Promise<Store> {
    const { name, address, cui, reg_number, iban, bank, phone_number, e_mail} = createStoreDto;

    const store = new Store();
    store.name = name;
    store.address = address;
    store.cui = cui;
    store.reg_number = reg_number;
    store.iban = iban;
    store.bank = bank;
    store.phone_number = phone_number;
    store.e_mail = e_mail;
    await store.save();

    return store;
  }

  async getStores (filterDto: GetStoreFilterDto): Promise<Store[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('store');

    if (search) {
      query.andWhere('store.name LIKE :search ' +
        'OR store.address LIKE :search ' +
        'OR store.cui LIKE :search ' +
        'OR store.reg_number LIKE :search ' +
        'OR store.phone_number LIKE :search ' +
        'OR store.e_mail LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
