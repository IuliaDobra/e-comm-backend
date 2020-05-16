import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  cui: string;

  @Column()
  reg_number: string;

  @Column()
  iban: string;

  @Column()
  bank: string;

  @Column()
  phone_number: string;

  @Column()
  e_mail: string;
}
