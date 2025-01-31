import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteProductDto } from './dto/delete-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern({ cmd: 'create_product' })
  // create(@Body() createProductDto: CreateProductDto) {
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all_products' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_product' })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() data: DeleteProductDto) {
    return this.productsService.remove(data.id);
  }

  @MessagePattern({ cmd: 'wait_response' })
  waitForR(@Payload() data: DeleteProductDto) {
    return this.productsService.functionToUpdate(data.id);
  }

  @EventPattern({ cmd: 'not_wait_response' })
  notWaitForR(@Payload() data: DeleteProductDto) {
    return this.productsService.functionToUpdate(data.id);
  }
}
