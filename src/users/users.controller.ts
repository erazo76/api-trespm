import { Controller, Get, Post, Body, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary:'Register a user by name, last name and document'})
  async create(@Res() res:Response, @Body() createUserDto: CreateUserDto): Promise<any> {
    let user = await this.usersService.create(createUserDto);
    if(!user){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error on server'});
    }else{
      return res.status(HttpStatus.CREATED).json(user);      
    } 
  } 

  @Get()
  @ApiOperation({summary:'Obtain user list'})
  async findAll(@Res() res:Response):Promise<any> {
    let users = await this.usersService.findAll();    
    if(users.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(users); 
  }

  @Delete('/:id')
  @ApiOperation({summary:'Remove user by user Id'})
  async delete(@Res() res:Response, @Param('id') id: string):Promise<any> {
    let user = await this.usersService.delete(id);      
    if(user == undefined){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json({message:'Record deleted successfully'}); 
  }

}
