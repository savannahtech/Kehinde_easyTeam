import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  if (process.env.APP_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('The Test')
      .setDescription('Test API notes')
      .setVersion('1.0')
      .addTag('tests')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.use(cookieParser());
  app.enableCors();
  await app.listen(port);
  Logger.log(`🚀 Server running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
