import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  getAllProducts(
    filterDto: GetProductFilterDto
  ): Promise<Product[]> {
    return this.productRepository.getAllProducts(filterDto);
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return found;
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const { name, description, category, price, currency } = updateProductDto;

    let product = await this.getProductById(id);
    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.currency = currency;

    await product.save()

    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }


}
