import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { Store } from './store.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('stores')
@UseGuards(AuthGuard())
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getStores(
    @Query() filterDto: GetStoreFilterDto,
    @GetUser() user: User,
  ): Promise<Store[]>  {
    return this.storesService.getStores(filterDto, user);
  }

  @Get('/:id')
  getStoreById(
    @Param('id', ParseIntPipe,) id: number,
    @GetUser() user: User,
    ): Promise<Store> {
    return this.storesService.getStoreById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStore(
    @Body() createStoreDto: CreateStoreDto,
    @GetUser() user: User,
  ): Promise<Store> {
    return this.storesService.createStore(createStoreDto, user);
  }

  @Delete('/:id')
  deleteStore(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.storesService.deleteStore(id, user);
  }

  @Patch('/:id')
  updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto,
    @GetUser() user: User
  ): Promise<Store> {
    return this.storesService.updateStore(id, updateStoreDto, user);
  }
}
