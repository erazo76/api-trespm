import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [    
    DatabaseModule,    
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    SalesModule,
    RolesModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
