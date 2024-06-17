import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterationRequest } from '../../auth/dtos/registeration.dto';
import * as bcrypt from 'bcrypt';
import { mapToUserDTO } from './users.utilities';
import { Roles } from '../entity/users.roles';
import { UsersDTO } from '../dto/users.dto';
import { OTPsService } from 'src/otps/service/otps.service';
import { OTPRequest } from 'src/otps/dto/otp-request.dto';
import { StandardReponse, customResponse } from 'src/utility/standard-response';
import { Request } from 'express';
import { RegRoute } from '../entity/user.route';
import { REQUEST, REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';

@Injectable({ })
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private otpService: OTPsService,
        @Inject(REQUEST) 
        private readonly request: Request
    ){}

    async registerUser(userDTO: RegisterationRequest): Promise<UsersDTO>{
        const user = new Users();
        
        const isExistingByEmail: boolean = await this.userRepository.existsBy({ email: userDTO.email });
        if(isExistingByEmail) throw new BadRequestException("Email has been used");

        const isExistingByPhoneNumber: boolean = await this.userRepository.existsBy({ phoneNumber: userDTO.phoneNumber });
        if(isExistingByPhoneNumber) throw new BadRequestException("Phone Number has been used");

        
        user.email = userDTO.email;
        user.fullName = userDTO.fullName;
        
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userDTO.password,salt);
        user.password = password;
        user.role = userDTO.role;
        user.phoneNumber = userDTO.phoneNumber;

        const savedUser = await this.userRepository.save(user);

        this.otpService.createAndSendOTP(user.email);
        const dto = mapToUserDTO(savedUser);
        // todo - 1.generate otp, 2.send otp to email 3. set emailVerified to true
        return dto;
    }
    

    async requestAccountVerificationToken(otpRequest: OTPRequest): Promise<String>{

        await this.otpService.createAndSendOTP(otpRequest.email);
        return  "OTP Requested Successfully";
    }

    async validateOTP(otpRequest: OTPRequest): Promise<String>{

        const user = await this.userRepository.findOne({
            where: { email: otpRequest.email }
        })
        if(!user) throw new BadRequestException("Unauthorized User");
        if(!otpRequest.otp) throw new BadRequestException("Inavlid OTP");

        const isValid = await this.otpService.verifyOTP(otpRequest.email,otpRequest.otp, true);
        if(!isValid) throw new BadRequestException("OTP Has Expired");

        user.emailVerified = true;
        this.userRepository.save(user);

        return "OTP Verified Successfully";
    }

    async findByEmail(email: string): Promise<Users | undefined> {
      const user = await this.userRepository.findOne({
            where: { email }
        })
    
        if(!user) throw new BadRequestException("Email Not Registered");

        return user;
    }

    async isExistingByEmail(email: string){
        return await this.userRepository.exists({ where: { email} })
    }

    async saveUser(user: Users): Promise<Users>{
        return this.userRepository.save(user);
    }

    async getProfile(): Promise<UsersDTO> {
        const user = await this.getAuthenticatedUser();
        return mapToUserDTO(user);
    }

    async getAuthenticatedUser(): Promise<Users> {
        const userPayload: any = this.request["user"];
        if(!userPayload) throw new UnauthorizedException("No User Payload");
        const username = userPayload?.username;
        if(!userPayload) throw new UnauthorizedException("No Username On Payload");
        const user = await this.userRepository.findOne({
            where: { email: username }
        })
        if(!user) throw new UnauthorizedException("User Not Found");
        return user;
    }

    async changePassword(){

    }

    async updateProfile(){
        
    }

}

type UserPayload = { sub: Roles, username: string, reg_route: RegRoute }
