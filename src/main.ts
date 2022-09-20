import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try{
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);  
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
    .setTitle('Trespm Api')
    .setDescription('Prueba pre-selección para 3 Pi Medios, S.A.S')
    .setVersion('1.0')    
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders:
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
      credentials: true,
    });
    
    const server = await app.listen(PORT, async () => {
      Logger.log(`Api-trespm Server is running in port ${PORT}`);     
    });    
  } catch (error) {
    Logger.error('Error initializing Api-trespm Server', error);
  }  
}
bootstrap();
