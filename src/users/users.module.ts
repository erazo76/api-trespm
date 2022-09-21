import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
