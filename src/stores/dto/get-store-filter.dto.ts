import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetStoreFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
