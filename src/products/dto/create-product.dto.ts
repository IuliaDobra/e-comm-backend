import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  storeId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  currency: string;
}
