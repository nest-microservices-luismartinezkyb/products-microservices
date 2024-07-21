import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  public products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;
    const uuid = crypto.randomUUID();
    const newProduct = new Product(uuid, name, description, price);
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('PRODUCT_NOT_FOUND');
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...values } = updateProductDto;
    const product = this.findOne(id);
    product.updateWith(values);
    return product;
  }

  remove(id: string) {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== product.id);
    return `Product ${id} deleted successfully`;
  }
}
