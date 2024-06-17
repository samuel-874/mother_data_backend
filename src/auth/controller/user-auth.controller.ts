import { AuthService } from "./../service/auth.service";
import { AuthRequest } from "../dtos/auth-request.dto";
import { UsersService } from "src/users/service/users.service"

import { Controller, Post, Body, Query, HttpStatus, HttpCode, Req, Res, UseGuards, Param } from "@nestjs/common";
import { UsersDTO } from "../../users/dto/users.dto";
import { RegisterationRequest } from "../dtos/registeration.dto";
import { ValidUserPipe } from "../../utility/app-pipes.pipe";
import { OTPRequest } from "src/otps/dto/otp-request.dto";
import { StandardReponse } from "src/utility/standard-response";import { AuthGuard } from "../service/auth.guard";
import { Public } from "../service/public.decorator";
import { PasswordReset } from "src/users/dto/password-reset.dto";
import { EmailRequest } from "src/otps/dto/email-request.dto";
;

@Public()
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

    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    refresh(@Query('token') token: string){        
        return this.authService.refreshToken(token);
    }

    
    @Post('/register')
    async registerUser(@Body( ValidUserPipe) regReq: RegisterationRequest): Promise<UsersDTO>{
        return await this.userService.registerUser(regReq);
    }

    @Post('/request_acctivation')
    @HttpCode(HttpStatus.OK)
    async requestAccVerificationOTP(@Body() optRequest: EmailRequest): Promise<String>{
        return await this.userService.requestAccountVerificationToken(optRequest);
    }

    @Post('/validate_otp')
    @HttpCode(HttpStatus.OK)
    async validateOTP(@Body() optRequest: OTPRequest): Promise<String>{
        return await this.userService.validateOTP(optRequest);
    }

    @Post('/request_password_otp')
    @HttpCode(HttpStatus.OK)
    async requestPasswordOTP(@Body() optRequest: EmailRequest): Promise<String>{
        return await this.userService.requestPasswordResstToken(optRequest);
    }


    @Post('/validate_password_otp')
    @HttpCode(HttpStatus.OK)
    async validatePasswordResetOTP(@Body() optRequest: OTPRequest): Promise<String>{
        return await this.userService.validateResetPasswordOTP(optRequest);
    }

    @Post('/reset_password')
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body() passwordReset: PasswordReset): Promise<String>{
        return await this.userService.resetPassword(passwordReset);
    }
}