import { Injectable, Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SalesService {
  logger: Logger;
  constructor(@InjectRepository(Sale) private saleRep: Repository<Sale>,
              @InjectRepository(Product) private productRep: Repository<Product>,
              @InjectRepository(User) private userRep: Repository<User>,){
    this.logger = new Logger('Reports Service');
  }


  async create(createSaleDto: CreateSaleDto):Promise<any> { 
    let {userId, productId, qty} = createSaleDto;
      try{       
          const sale = this.saleRep.create(createSaleDto);
          const user = await this.userRep.findOne({
            where:{
              id: userId
            }
          });
          if(!user){          
            return undefined;
          } 
          const product = await this.productRep.findOne({
            where:{
              id:productId
            }
          });
          if(!user){          
            return undefined;
          } 
          sale.user = user;
          sale.product = product;
          sale.qty = qty;  

          return await this.saleRep.save(sale); 

      }catch (e) { 
        console.log(e);      
      }
  }


  async findAll(): Promise<Sale[]> {
    try {
      const sales = await this.saleRep.createQueryBuilder('sale')        
      .leftJoin('sale.product', 'product')
      .leftJoin('sale.user', 'user')
      .select(['product.name','product.description','user.name','user.document','sale.qty','sale.saleAt','sale.id'])
      .getMany();
      return sales;
    } catch (e) {
      console.log(e);
    }
  }  


  async delete(id:string): Promise<any> {
    try {
      const sale = await this.saleRep.findOne(id);
      if(sale){
        await this.saleRep.delete(id);
      }       
      return sale;
    } catch (e) {
      console.log(e);
    }
  } 

}
