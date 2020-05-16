import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { Store } from './store.entity';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getStores(@Query() filterDto: GetStoreFilterDto): Promise<Store[]>  {
    return this.storesService.getStores(filterDto);
  }

  @Get('/:id')
  getStoreById(@Param('id', ParseIntPipe) id: number): Promise<Store> {
    return this.storesService.getStoreById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStore(@Body() createStoreDto: CreateStoreDto ): Promise<Store> {
    return this.storesService.createStore(createStoreDto);
  }

  @Delete('/:id')
  deleteStore(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.storesService.deleteStore(id);
  }

  @Patch('/:id')
  updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto): Promise<Store> {
    return this.storesService.updateStore(id, updateStoreDto);
  }
}
