import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envs from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/dtos/exceptions/rpc-exception.filter';

async function bootstrap() {

  const logger = new Logger('Main-Gateway')
 

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(envs.port ?? 3000);


  logger.log(`Gateway is running on ${envs.port ?? 3000} port`);
}
bootstrap();
