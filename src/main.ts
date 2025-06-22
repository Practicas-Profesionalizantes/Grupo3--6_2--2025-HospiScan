import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // al escribir la ruta http se deberá escribir eso
  app.setGlobalPrefix('api/v0');

  // Se crea una configuración de la validacion para 
  // automaticamente verificar inputs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Tira error a propiedades no definidas en el DTO
      transform: true,            // Transforma los datos (por ejemplo un input de: "123" se transforma a 123)
    }),
  );

  // Utiliza el puerto 3001
  await app.listen(3001);
}
bootstrap();
