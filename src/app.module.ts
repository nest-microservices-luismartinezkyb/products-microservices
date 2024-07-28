import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './config/db/prisma.module';
@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
