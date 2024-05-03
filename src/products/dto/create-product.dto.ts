import { IsNotEmpty } from 'class-validator';
import { ProductCategory } from '../product-category.enum';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category: ProductCategory;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  rating: number;
}
