import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import { AnyExceptionFilter } from '@filters';

async function startApp() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.setGlobalPrefix('/api/v1')

  app.useGlobalFilters(new AnyExceptionFilter())

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