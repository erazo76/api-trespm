import { Injectable, Logger } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import * as moment from 'moment-timezone';
import { format } from 'path';

@Injectable()
export class SalesService {
  logger: Logger;
  constructor(@InjectRepository(Sale) private saleRep: Repository<Sale>,
              @InjectRepository(Product) private productRep: Repository<Product>,
              @InjectRepository(User) private userRep: Repository<User>,){
    this.logger = new Logger('Reports Service');
  }


/**
 * It creates a sale, finds the user and product associated with the sale, and then saves the sale
 * @param {CreateSaleDto} createSaleDto - CreateSaleDto
 * @returns The sale object is being returned.
 */
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


/**
 * It returns a list of sales, each sale containing the name, description, name, document, qty, saleAt
 * and id of the product and user associated with the sale
 * @returns async findAll(): Promise<Sale[]> {
 *     try {
 *       const sales = await this.saleRep.createQueryBuilder('sale')        
 *       .leftJoin('sale.product', 'product')
 *       .leftJoin('sale.user', 'user')
 *       .select(['product.name','product.description','user.name','
 */
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

/**
 * It finds a sale by id, if it exists, it updates the sale with the new data, and returns the updated
 * sale
 * @param {string} id - The id of the sale you want to update.
 * @param {UpdateSaleDto} updateSaleDto - UpdateSaleDto
 * @returns The updated sale.
 */
  async update(id: string, updateSaleDto: UpdateSaleDto) {
    try {
      const sale = await this.saleRep.findOne(id);
      if(!sale){
        return undefined;
      }

      if(updateSaleDto.userId){
        const user = await this.userRep.findOne(updateSaleDto.userId);
        sale.user = user;
      }  
      if(updateSaleDto.productId){
        const product = await this.productRep.findOne(updateSaleDto.productId);
        sale.product = product;
      }    
      this.saleRep.merge(sale, updateSaleDto);     
      return await this.saleRep.save(sale);
      
    } catch (e) {
      console.log(e);
    } 
  } 

/**
 * It finds a sale by id, deletes it if it exists, and returns the deleted sale
 * @param {string} id - The id of the sale you want to delete.
 * @returns The sale that was deleted.
 */
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



  async getByDate(date: string): Promise<number> {
    try {
      let day = moment(date).add(-5, 'h').format();//varianza por zona horaria
      let day1 = moment(date).add(1, 'd').add(-5,'h').format(); //varianza por zona horaria

      const totalSales = await this.saleRep.createQueryBuilder('sale')
      .leftJoin('sale.product', 'product')
      .select("SUM(sale.qty*product.price)", "total")
      .addSelect("SUM(sale.qty)", "quantity")
      .where(`"saleAt" BETWEEN '${day}' AND '${day1}'`)     
      .getRawOne()
      return totalSales;
    } catch (e) {
      console.log(e);
    }
  } 

  async getByMonth(date: string): Promise<number> {
    try {
      let day1 = moment(date).add(1, 'd').add(-5, 'h').format();//varianza por zona horaria
      let day = moment(date).add(-30, 'd').add(-5,'h').format(); //varianza por zona horaria

      const totalSales = await this.saleRep.createQueryBuilder('sale')
      .leftJoin('sale.product', 'product')
      .select("SUM(sale.qty*product.price)", "total")
      .addSelect("SUM(sale.qty)", "quantity")
      .where(`"saleAt" BETWEEN '${day}' AND '${day1}'`)     
      .getRawOne()
      return totalSales;
    } catch (e) {
      console.log(e);
    }
  } 

}
