import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UserController } from './users.controller';
import { OtpsModule } from 'src/otps/otps.module';

@Module({
  imports: [
    OtpsModule,
    TypeOrmModule.forFeature([Users])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule {}
