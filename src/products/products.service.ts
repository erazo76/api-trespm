import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  logger: Logger;
  constructor(@InjectRepository(Product) private productRep: Repository<Product>){
    this.logger = new Logger('Reports Service');
  }

/**
 * It creates a new product and saves it to the database
 * @param {CreateProductDto} createProductDto - This is the DTO that we created earlier.
 * @returns The product object is being returned.
 */
  async create(createProductDto: CreateProductDto):Promise<Product> { 
    try{
      const product = this.productRep.create(createProductDto);
      return await this.productRep.save(product);
    }catch (e) { 
      console.log(e);      
    }
  }

/**
 * It returns a promise of an array of products
 * @returns An array of products
 */
  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRep.find();
      return products;
    } catch (e) {
      console.log(e);
    }
  }  

/**
 * It finds a product by id, deletes it if it exists, and returns the deleted product
 * @param {string} id - The id of the product to be deleted.
 * @returns The product that was deleted.
 */
  async delete(id:string): Promise<any> {
    try {
      const product = await this.productRep.findOne(id);
      if(product){
        await this.productRep.delete(id);
      }       
      return product;
    } catch (e) {
      console.log(e);
    }
  } 

}
