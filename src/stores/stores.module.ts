import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRepository]),
  ],
  controllers: [StoresController],
  providers: [StoresService]
})
export class StoresModule {}
