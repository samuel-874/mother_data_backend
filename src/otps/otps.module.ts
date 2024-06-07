import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPS } from './entity/otp.entity';
import { OTPsService } from './service/otps.service';

@Module({
    imports: [TypeOrmModule.forFeature([OTPS])],
    providers: [OTPsService],
    exports: [OTPsService]
})
export class OtpsModule {}
