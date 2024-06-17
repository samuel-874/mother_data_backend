import { Controller, Post, Body, Query, HttpStatus, HttpCode, Req, Res, Get } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { UsersDTO } from "./dto/users.dto";
import { OTPRequest } from "src/otps/dto/otp-request.dto";
import { StandardReponse } from "src/utility/standard-response";
import { Permit } from "src/auth/service/roles.decorator";
import { Roles } from "./entity/users.roles";

@Controller('/api/v1/user')
export class UserController {

    constructor(
        private readonly userService: UsersService
    ){}


    @Get("/me")
    // @Permit([Roles.ADMIN])
    async me(){
       return await this.userService.getProfile() 
    }

}