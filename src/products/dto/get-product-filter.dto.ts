import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetProductFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  storeId: number;
}
