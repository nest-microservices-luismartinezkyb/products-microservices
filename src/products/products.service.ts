import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { Product } from './entities/product.entity';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/config/db/prisma.service';
import { Product } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  // public products: Product[] = [];

  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      console.log({ error });
      throw new BadRequestException('ERROR_CREATING');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const countData = await this.prismaService.product.count();
    const totalPages = Math.ceil(countData / limit);
    const data = await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isActive: true,
      },
    });
    return {
      data,
      meta: {
        totalData: countData,
        lastPage: totalPages,
        page,
      },
    };
    // return this.products;
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id, isActive: true },
    });
    // const products = await this.findAll();
    // const product = products.find((p) => p.id === id);
    // if (!product) throw new NotFoundException('PRODUCT_NOT_FOUND');
    if (!product) throw new RpcException('PRODUCT_NOT_FOUND');
    //SE CAMBIO NOT FOUND EXCEPTION FOR RPC EXCEPTION
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...values } = updateProductDto;
    await this.findOne(id);
    const productUpdated = await this.prismaService.product.update({
      where: { id },
      data: values,
    });
    // product.updateWith(values);
    return productUpdated;
  }

  async remove(id: string) {
    await this.findOne(id);
    // await this.prismaService.product.delete({
    //   where: { id },
    // });
    await this.prismaService.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
    // this.products = this.products.filter((p) => p.id !== product.id);
    return {
      message: `Product ${id} deleted successfully`,
    };
  }

  async functionToUpdate(id: string) {
    //THIS FUNCTION TARDA 3 seconds
    for (let i = 0; i < 3; i++) {
      console.log('object', i);
      await this.delay(1000);
    }
    console.log('termino');
    // throw new RpcException('PRODUCT_NOT_FOUND');
    return `This action returns a #${id} user`;
  }
  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
