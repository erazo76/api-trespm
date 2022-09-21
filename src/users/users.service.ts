import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(@InjectRepository(User) private userRep: Repository<User>){
    this.logger = new Logger('Reports Service');
  }

/**
 * It creates a new user and saves it to the database
 * @param {CreateUserDto} createUserDto - This is the DTO that we created earlier.
 * @returns The user object is being returned.
 */
  async create(createUserDto: CreateUserDto):Promise<User> { 
    try{
      const user = this.userRep.create(createUserDto);
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
      const users = await this.userRep.find();
      return users;
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
