import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UserController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  providers: [UsersService],
  controllers: [UserController]
})
export class UsersModule {}
