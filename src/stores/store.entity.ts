import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';

@Entity()
@Unique(['cui', 'reg_number'])
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

  @ManyToOne(type => User, user => user.stores, { eager: false })
  user: User;

  @Column()
  userId: number;
}
