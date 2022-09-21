import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(@InjectRepository(User) private userRep: Repository<User>,
              @InjectRepository(Role) private roleRep: Repository<Role>,){
    this.logger = new Logger('Reports Service');
  }

/**
 * It creates a new user and saves it to the database
 * @param {CreateUserDto} createUserDto - This is the DTO that we created earlier.
 * @returns The user object is being returned.
 */
  async create(createUserDto: CreateUserDto):Promise<User> { 
    let {name, lastName, document, roleId} = createUserDto;
    try{
      const user = this.userRep.create(createUserDto);
      const role = await this.roleRep.findOne({
        where:{
          id: roleId
        }
      });
      if(!role){          
        return undefined;
      } 
      user.role = role; 
      return await this.userRep.save(user);
    }catch (e) { 
      console.log(e);      
    }
  }

/**
 * It returns a promise of an array of users
 * @returns An array of users
 */
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRep.createQueryBuilder('user')        
      .leftJoin('user.role', 'role')      
      .select(['role.name','user.name','user.lastName','user.document','user.id'])
      .getMany();
      return users;
    } catch (e) {
      console.log(e);
    }
  }  

/**
 * We're using the `findOne()` method to find a user by their id, then we're using the `merge()` method
 * to merge the user with the updateUserDto object, and finally we're using the `save()` method to save
 * the user
 * @param {string} id - The id of the user to update.
 * @param {UpdateUserDto} updateUserDto - This is the DTO that we created earlier.
 * @returns The user object is being returned.
 */
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRep.findOne(id);
      if(!user){
        return undefined;
      }
      if(updateUserDto.roleId){
        const role = await this.roleRep.findOne(updateUserDto.roleId);
        user.role = role;
      }      
      this.userRep.merge(user, updateUserDto);     
      return await this.userRep.save(user);
      
    } catch (e) {
      console.log(e);
    } 
  }  

/**
 * It finds a user by id, deletes it if it exists, and returns the deleted user
 * @param {string} id - The id of the user to be deleted.
 * @returns The user that was deleted.
 */
  async delete(id:string): Promise<any> {
    try {
      const user = await this.userRep.findOne(id);
      if(user){
        await this.userRep.delete(id);
      }       
      return user;
    } catch (e) {
      console.log(e);
    }
  } 

}
