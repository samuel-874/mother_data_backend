import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterationRequest } from '../dto/registeration.dto';
import * as bcrypt from 'bcrypt';
import { mapToUserDTO } from './users.utilities';
import { Roles } from '../entity/users.roles';
import { UsersDTO } from '../dto/users.dto';
import { OTPsService } from 'src/otps/service/otps.service';
import { OTPRequest } from 'src/otps/dto/otp-request.dto';
import { StandardReponse, customResponse } from 'src/utility/standard-response';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private otpService: OTPsService
    ){}

    async registerUser(userDTO: RegisterationRequest): Promise<StandardReponse>{
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
        return customResponse("Registered Successfully",201, dto);
    }
    

    async requestAccountVerificationToken(otpRequest: OTPRequest): Promise<StandardReponse>{

        await this.otpService.createAndSendOTP(otpRequest.email);
        return  customResponse("OTP Requested Successfully",200, null) ;
    }

    async validateOTP(otpRequest: OTPRequest){

        const user = await this.userRepository.findOne({
            where: { email: otpRequest.email }
        })
        if(!user) throw new BadRequestException("Unauthorized User");
        if(!otpRequest.otp) throw new BadRequestException("Inavlid OTP");

        const isValid = await this.otpService.verifyOTP(otpRequest.email,otpRequest.otp, true);
        if(!isValid) throw new BadRequestException("OTP Has Expired");

        user.emailVerified = true;
        this.userRepository.save(user);

        return customResponse("OTP Verified Successfully",200,null);
    }




}
