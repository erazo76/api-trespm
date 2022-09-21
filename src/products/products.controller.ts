import { Controller, Get, Post, Body, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({summary:'Register a product by name, description and price'})
  async create(@Res() res:Response, @Body() createProductDto: CreateProductDto): Promise<any> {
    let product = await this.productsService.create(createProductDto);
    if(!product){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error on server'});
    }else{
      return res.status(HttpStatus.CREATED).json(product);      
    } 
  } 

  @Get()
  @ApiOperation({summary:'Obtain product list'})
  async findAll(@Res() res:Response):Promise<any> {
    let products = await this.productsService.findAll();    
    if(products.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(products); 
  }

  @Delete('/:id')
  @ApiOperation({summary:'Remove product by product Id'})
  async delete(@Res() res:Response, @Param('id') id: string):Promise<any> {
    let product = await this.productsService.delete(id);      
    if(product == undefined){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json({message:'Record deleted successfully'}); 
  }

}
