import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:5173', // Or specify origins like ['http://localhost:3001']
    credentials: true, // Allow cookies to be sent with cross-origin requests
  });
  await app.listen(3000);
}

bootstrap();
