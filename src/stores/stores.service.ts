import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { StoreRepository } from './store.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreRepository)
    private storeRepository: StoreRepository,
  ) {}

  getStores(filterDto: GetStoreFilterDto): Promise<Store[]> {
    return this.storeRepository.getStores(filterDto);
  }

  async getStoreById(id: number): Promise<Store> {
    const found = await this.storeRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Store with id ${id} not found`)
    }
    return found;
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeRepository.createTask(createStoreDto);
  }

  async deleteStore(id: number): Promise<void> {
    const result = await this.storeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Store with id ${id} not found`)
    }
  }

  async updateStore(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const { address, iban, bank, phone_number, e_mail } = updateStoreDto;

    let store = await this.getStoreById(id);
    store.address = address;
    store.iban = iban;
    store.bank = bank;
    store.phone_number = phone_number;
    store.e_mail = e_mail;
    await  store.save();

    return store;
  }
}
