import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store } from './store.model';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getStores(@Query() filterDto: GetStoreFilterDto): Store[] {
    if(Object.keys(filterDto).length) {
      return this.storesService.getStoresWithFilters(filterDto);
    } else {
      return this.storesService.getAllStores();
    }
  }

  @Get('/:id')
  getStoreById(@Param('id') id: string): Store {
    return this.storesService.getStoreById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStore( createStoreDto: CreateStoreDto): Store {
    return this.storesService.createStore(createStoreDto);
  }

  @Delete('/:id')
  deleteStore(@Param('id') id: string): void {
    this.storesService.deleteStore(id);
  }

  @Patch('/:id')
  updateStore(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto): Store {
    return this.storesService.updateStore(id, updateStoreDto);
  }
}
