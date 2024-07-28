import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('DatabaseLogger');
  async onModuleInit() {
    this.logger.log('Database Connected');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
