import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import { OtpsModule } from './otps/otps.module';
import { OTPS } from './otps/entity/otp.entity';


const dotenv = require("dotenv");
dotenv.config();


const env = process.env;
const port = process.env.DB_PORT;
const sync = process.env.DB_SYNC ;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(port),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      autoLoadEntities: true,
      synchronize: sync === "true"
    }),
    UsersModule,
    OtpsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
