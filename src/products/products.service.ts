import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .getMany();
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    return product;
  }

  async createNewProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, image, rating, price, category } =
      createProductDto;
    const product = await this.productRepository.create({
      title,
      description,
      image,
      rating,
      price,
      category,
    });
    this.productRepository.save(product);
    return product;
  }

  async updateProduct(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { title, description, image, rating, price, category } =
      createProductDto;
    const product = await this.getProductById(id);
    product.title = title;
    product.description = description;
    product.image = image;
    product.rating = rating;
    product.price = price;
    product.category = category;
    this.productRepository.save(product);
    return product;
  }

  async deleteProductById(id: string): Promise<void> {
    const product = this.productRepository.delete(id);
    if (product) return;
    else
      throw new NotFoundException(
        `Product with ${id} is not present in the system`,
      );
  }
}
