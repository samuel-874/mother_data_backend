import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersService } from 'src/users/service/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserAuthController } from './controller/user-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService],
  controllers: [UserAuthController]
})
export class AuthModule {}
