import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: ['POST', 'GET'],
  });
  const config = new DocumentBuilder()
    .setTitle('Battle Simulator example')
    .setVersion('1.0')
    .addTag('battle-simulator')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableShutdownHooks();
  await app.listen(5000);
}
bootstrap();
