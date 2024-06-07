import { Controller, Post, Body, Query, HttpStatus, HttpCode } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { UsersDTO } from "./dto/users.dto";
import { RegisterationRequest } from "./dto/registeration.dto";
import { ValidUserPipe } from "./service/users.pipe";
import { OTPRequest } from "src/otps/dto/otprequest.dto";

@Controller('/api/v1/user/auth')
export class UserController {

    constructor(
        private readonly userService: UsersService
    ){}


    @Post('/register')
    async registerUser(@Body( ValidUserPipe) regReq: RegisterationRequest): Promise<UsersDTO>{
        return await this.userService.registerUser(regReq);
    }

    @Post('/request_acctivation')
    @HttpCode(HttpStatus.OK)
    async requestAccVerificationOTP(@Body() optRequest: OTPRequest){
        return await this.userService.requestAccountVerificationToken(optRequest);
    }
}