import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  logger: Logger;
  constructor(@InjectRepository(Role) private roleRep: Repository<Role>){
    this.logger = new Logger('Reports Service');
  }

/**
 * It creates a new role and saves it to the database
 * @param {CreateRoleDto} createRoleDto - This is the DTO that we created earlier.
 * @returns The role object is being returned.
 */
  async create(createRoleDto: CreateRoleDto):Promise<Role> { 
    try{
      const role = this.roleRep.create(createRoleDto);
      return await this.roleRep.save(role);
    }catch (e) { 
      console.log(e);      
    }
  }

/**
 * It returns a promise of an array of roles
 * @returns An array of roles
 */
  async findAll(): Promise<Role[]> {
    try {
      const roles = await this.roleRep.find();
      return roles;
    } catch (e) {
      console.log(e);
    }
  }  

/**
 * It finds a role by id, deletes it if it exists, and returns the deleted role
 * @param {string} id - The id of the role to be deleted.
 * @returns The role that was deleted.
 */
  async delete(id:string): Promise<any> {
    try {
      const role = await this.roleRep.findOne(id);
      if(role){
        await this.roleRep.delete(id);
      }       
      return role;
    } catch (e) {
      console.log(e);
    }
  } 

}
