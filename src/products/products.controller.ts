import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Product> {
    const product = this.productsService.getProductById(id);
    const returnObject = {
      status: res.status,
      body: product,
    };
    return product;
  }

  @Post('/create-product')
  createNewProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createNewProduct(createProductDto);
  }

  @Patch('/edit/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, createProductDto);
  }

  @Delete('/delete/:id')
  deleteProductById(@Param('id') id: string): Promise<void> {
    this.productsService.deleteProductById(id);
    return;
  }
}
