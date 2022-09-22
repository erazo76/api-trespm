import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(id: string) {
    const user = await this.usersService.findById(id);  
    if (user ) {
      return user;
    }
    return null;
  }
}
