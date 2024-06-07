import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OTPs } from "../entity/otp.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OTPsService {

    constructor(
        @InjectRepository(OTPs)
        private readonly otpRepository: Repository<OTPs>
    ){}

    async createAndSendOTP(email: string): Promise<void> {
        const userOTP = await this.getOrInitOTP(email);
        const date =  new Date();
        const exp = 30; //30mins
        userOTP.createdAt = date;
        userOTP.expiration = new Date(date.getTime() + (exp* 60000)) ;
        userOTP.usersEmail = email;
        userOTP.token = this.generateToken();
        userOTP.verified = false;
        userOTP.used = false;

        console.log(userOTP);
        this.otpRepository.save(userOTP);
    }

    // TODO - 1. VERIFY TOKEN METHOD, 2. HAS VERITY TOKEN METHOD
    
    async verifyOTP(email: string, token: number){

    }


    async getOrInitOTP(email: string){
        const nullableOtp = await this.otpRepository.findOne({
            where: { usersEmail: email }
        })

        if(!nullableOtp) return new OTPs;
        return nullableOtp;
    }

    generateToken(){
        return Math.floor(Math.random() * 900_000 + 100_000);
    }
}