import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', credentials: true });

  await app.listen(3000, () => console.log(`Server started on port = 3000`));
}
bootstrap();
