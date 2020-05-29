import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { StoreRepository } from './store.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreRepository)
    private storeRepository: StoreRepository,
  ) {}

  getStores(
    filterDto: GetStoreFilterDto,
    user: User
  ): Promise<Store[]> {
    return this.storeRepository.getStores(filterDto, user);
  }

  async getStoreById(
    id: number,
    user: User
  ): Promise<Store> {
    const found = await this.storeRepository.findOne({ where: { id, userId: user.id}});

    if(!found) {
      throw new NotFoundException(`Store with id ${id} not found`)
    }
    return found;
  }

  async createStore(
    createStoreDto: CreateStoreDto,
    user: User
  ): Promise<Store> {
    return this.storeRepository.createStore(createStoreDto, user);
  }

  async deleteStore(
    id: number,
    user: User
  ): Promise<void> {
    const result = await this.storeRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Store with id ${id} not found`)
    }
  }

  async updateStore(
    id: number, updateStoreDto: UpdateStoreDto,
    user: User
  ): Promise<Store> {
    const { address, iban, bank, phone_number, e_mail } = updateStoreDto;

    let store = await this.getStoreById(id, user);
    store.address = address;
    store.iban = iban;
    store.bank = bank;
    store.phone_number = phone_number;
    store.e_mail = e_mail;
    await store.save();

    return store;
  }
}
