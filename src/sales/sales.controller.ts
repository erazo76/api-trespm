import { Controller, Get, Post, Body, Res, HttpStatus, Delete, Param, Put } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto, UpdateSaleDto } from './dto/create-sale.dto';
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

  @Put('/:id')
  @ApiOperation({summary:'Update partial data sale by sale Id'})
  async update(@Res() res:Response, @Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto):Promise<any> {
    let sale = await this.salesService.update(id,updateSaleDto);      
    if(sale == undefined){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json({message:'Record updated successfully',...sale}); 
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

  @Get('/:date/daily-totals')
  @ApiOperation({summary:'Obtain sales total by date (YYYY-MM-DD)'})
  async getByDate(@Res() res:Response, @Param('date') date: string):Promise<any> {
    let sales = await this.salesService.getByDate(date);    
    if(sales < 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(sales); 
  }

  @Get('/:date/month-totals')
  @ApiOperation({summary:'Obtain sales total from last 30 days by initial date (YYYY-MM-DD)'})
  async getByMonth(@Res() res:Response, @Param('date') date: string):Promise<any> {
    let sales = await this.salesService.getByMonth(date);    
    if(sales < 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(sales); 
  }

}
