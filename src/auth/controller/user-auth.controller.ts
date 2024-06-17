import { AuthService } from "./../service/auth.service";
import { AuthRequest } from "../dtos/auth-request.dto";
import { UsersService } from "src/users/service/users.service"

import { Controller, Post, Body, Query, HttpStatus, HttpCode, Req, Res } from "@nestjs/common";
import { UsersDTO } from "../../users/dto/users.dto";
import { RegisterationRequest } from "../dtos/registeration.dto";
import { ValidUserPipe } from "../../utility/app-pipes.pipe";
import { OTPRequest } from "src/otps/dto/otp-request.dto";
import { StandardReponse } from "src/utility/standard-response";;

@Controller("api/v1/auth/user")
export class UserAuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ){}


    @Post("/authenticate")
    @HttpCode(HttpStatus.OK)
    authenticate(@Body() request: AuthRequest){
        return this.authService.signInUser(request);
    }

    
    @Post('/register')
    async registerUser(@Body( ValidUserPipe) regReq: RegisterationRequest): Promise<UsersDTO>{
        return await this.userService.registerUser(regReq);
    }

    @Post('/request_acctivation')
    @HttpCode(HttpStatus.OK)
    async requestAccVerificationOTP(@Body() optRequest: OTPRequest): Promise<String>{
        return await this.userService.requestAccountVerificationToken(optRequest);
    }

    @Post('/validate_otp')
    @HttpCode(HttpStatus.OK)
    async validateOTP(@Body() optRequest: OTPRequest): Promise<String>{
        return await this.userService.validateOTP(optRequest);
    }
}