import { Controller, Get, Post, Body, Res, HttpStatus, Delete, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({summary:'Register a role by name'})
  async create(@Res() res:Response, @Body() createRoleDto: CreateRoleDto): Promise<any> {
    let role = await this.rolesService.create(createRoleDto);
    if(!role){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error on server'});
    }else{
      return res.status(HttpStatus.CREATED).json(role);      
    } 
  } 

  @Get()
  @ApiOperation({summary:'Obtain roles list'})
  async findAll(@Res() res:Response):Promise<any> {
    let roles = await this.rolesService.findAll();    
    if(roles.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(roles); 
  }

  @Delete('/:id')
  @ApiOperation({summary:'Remove role by role Id'})
  async delete(@Res() res:Response, @Param('id') id: string):Promise<any> {
    let role = await this.rolesService.delete(id);      
    if(role == undefined){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json({message:'Record deleted successfully'}); 
  }

}
