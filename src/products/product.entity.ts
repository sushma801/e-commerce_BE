import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  category: ProductCategory;
  @Column()
  image: string;
  @Column()
  rating: number;
}
