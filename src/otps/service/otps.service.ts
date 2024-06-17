import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OTPS } from "../entity/otp.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OtpTypes } from "../entity/opt-types.enum";

@Injectable()
export class OTPsService {

    constructor(
        @InjectRepository(OTPS)
        private readonly otpRepository: Repository<OTPS>
    ){}

    async createAndSendOTP(email: string,type: OtpTypes): Promise<void> {
        const userOTP = await this.getOrInitOTP(email);
        const date =  new Date();
        const exp = 30; //30mins
        userOTP.createdAt = date;
        userOTP.expiration = new Date(date.getTime() + (exp* 60000)) ;
        userOTP.usersEmail = email;
        userOTP.token = this.generateToken();
        userOTP.verified = false;
        userOTP.used = false;
        userOTP.optType = type;

        console.log(userOTP);
        this.otpRepository.save(userOTP);
    }

    // TODO - 1. VERIFY TOKEN METHOD, 2. HAS VERITY TOKEN METHOD
    
    async verifyOTP(email: string, token: string, used: boolean): Promise<Boolean> {
        const userOTP = await this.otpRepository.findOne({
            where: { usersEmail: email, token: token }
        })

        if(!userOTP) throw new BadRequestException("Invalid OTP");
        // otp has not been verified && otp has not been used;

        if(userOTP.used) throw new BadRequestException("OTP has been used");
        if(userOTP.verified) throw new BadRequestException("OTP has been verified");



        const date = new Date()
        
        const isNotExpired = userOTP?.expiration.getTime() >  date.getTime();

        if(isNotExpired){
            userOTP.verified = true;
            userOTP.verificationDate = new Date();
            userOTP.used = used;
            // if(used) userOTP.token='000000';
            this.otpRepository.save(userOTP);
        }

        return isNotExpired; 
    }

    async hasVerifiedOTP(email: string, otp: string, type: OtpTypes): Promise<Boolean> {
        const userOTP = await this.otpRepository.findOne({
            where: { usersEmail: email }
        })
        
        const today = new Date();
        if(!userOTP) throw new BadRequestException("Invalid OTP");
        if(userOTP.optType !== type) throw new BadRequestException("Inavlid OTP");
        if(userOTP.used) throw new BadRequestException("OTP has been used Already");
        if(userOTP.token !== otp) throw new BadRequestException("Inavlid OTP");
        const wasVerifiedToday = userOTP.verificationDate.getDate() == today.getDate() && userOTP.verificationDate.getMonth() == today.getMonth() && userOTP.verificationDate.getFullYear() == today.getFullYear();
        if(!wasVerifiedToday) throw new BadRequestException("OTP Has Exceed Time. Request A New One");

        if(userOTP.verified && !userOTP.used){
            userOTP.used = true;
            // userOTP.token = '000000'
            await this.otpRepository.save(userOTP);
            return true;
        }

        return false;
    }


    private async getOrInitOTP(email: string){
        const nullableOtp = await this.otpRepository.findOne({
            where: { usersEmail: email }
        })

        if(!nullableOtp) return new OTPS;
        return nullableOtp;
    }

    private generateToken(){
        return `${Math.floor(Math.random() * 900_000 + 100_000)}`;
    }
}