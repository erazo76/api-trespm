import { Controller, Get, Post, Body, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({summary:'Register a sale by user id, product id and quantity'})
  async create(@Res() res:Response, @Body() createsaleDto: CreateSaleDto): Promise<any> {
    let sale = await this.salesService.create(createsaleDto);
    if(!sale){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data user/product'});
    }else{
      return res.status(HttpStatus.CREATED).json(sale);      
    } 
  } 

  @Get()
  @ApiOperation({summary:'Obtain sale list'})
  async findAll(@Res() res:Response):Promise<any> {
    let sales = await this.salesService.findAll();    
    if(sales.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(sales); 
  }

  @Delete('/:id')
  @ApiOperation({summary:'Remove sale by sale Id'})
  async delete(@Res() res:Response, @Param('id') id: string):Promise<any> {
    let sale = await this.salesService.delete(id);      
    if(sale == undefined){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json({message:'Record deleted successfully'}); 
  }

}
