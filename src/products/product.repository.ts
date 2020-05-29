import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
  async createProduct (
    createProductDto: CreateProductDto
  ): Promise<Product>{
    const { storeId, name, description, category, price, currency } = createProductDto
    const product = new Product();
    product.storeId = storeId;
    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.currency = currency;
    await product.save();

    return product;
  }

  async getAllProducts (
    getProductFilterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    const { search, storeId } = getProductFilterDto
    const query = this.createQueryBuilder('product');

    if (storeId) {
      query.where('product.storeId = :storeId', { storeId: storeId });
    }

    if (search) {
      query.andWhere('product.name LIKE :search ', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
