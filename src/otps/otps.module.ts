import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPs } from './entity/otp.entity';
import { OTPsService } from './service/otps.service';

@Module({
    imports: [TypeOrmModule.forFeature([OTPs])],
    providers: [OTPsService],
    exports: [OTPsService]
})
export class OtpsModule {}
