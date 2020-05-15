import { IsEmail, IsIBAN, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  cui: string;

  @IsNotEmpty()
  reg_number: string;

  @IsNotEmpty()
  @IsIBAN()
  iban: string;

  @IsNotEmpty()
  bank: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  e_mail: string;
}
