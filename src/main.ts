import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utility/app-interceptors';

const dotenv = require("dotenv");
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  app.useGlobalInterceptors(new ResponseInterceptor())

  const port = parseInt(process.env.PORT || "4004");
  await app.listen(port);
  console.log("mother data is live, port: " + port);
  
}
bootstrap();
