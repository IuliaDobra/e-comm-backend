import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getAllProducts(
    @Query() filterDto: GetProductFilterDto
  ): Promise<Product[]> {
   return this.productsService.getAllProducts(filterDto)
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  getProductById(id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  deleteProduct(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
