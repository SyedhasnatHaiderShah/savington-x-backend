import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RolesGuard } from './auth/guards/roles.guard';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });
  // app.enableCors();
  app.enableCors({
  // origin: ['http://localhost:3000','http://dev.savington-x.ae','https://dev.savington-x.ae', 'https://savington-x.ae' , 'https://www.savington-x.ae'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Savington-x API Documentation')
    .setDescription('The Savington-x API description - latest')
    .setVersion('1.1')
    .addTag('Savington-x')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken') // Use an object as the first argument
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule setup (see https://docs.nestjs.com/recipes/swagger)
  SwaggerModule.setup('api', app, document);

  // Global Guards (see https://docs.nestjs.com/guards#global-guards)
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

 
  // app starts listening on port 3003
  await app.listen(8000);
}
bootstrap();
