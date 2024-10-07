import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import { AnyExceptionFilter } from '@filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
  const app = await NestFactory.create(AppModule,{
    
    cors : true
  });

  const configService = app.get(ConfigService)

  app.setGlobalPrefix('/api/v1')

  app.useGlobalFilters(new AnyExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('My Blog')
    .setDescription('My Blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(
    configService.get<number>('appConfig.port'),
    configService.get<string>('appConfig.host'),
    () => {
      console.log('Server running on port : ',
        configService.get<number>('appConfig.port')
      );
    }
  );
}
startApp();