import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { UsersModule } from './users/users.module';

@Module({
  imports: [    
    DatabaseModule,    
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
