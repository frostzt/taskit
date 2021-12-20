import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformerInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000/', credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformerInterceptor());

  const PORT = process.env.PORT;

  await app.listen(PORT);
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
