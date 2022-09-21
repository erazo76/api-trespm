import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Sale,User,Product]),
  ],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
