import { Controller, Post, Body, Query, HttpStatus, HttpCode, Req, Res } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { UsersDTO } from "./dto/users.dto";
import { OTPRequest } from "src/otps/dto/otp-request.dto";
import { StandardReponse } from "src/utility/standard-response";

@Controller('/api/v1/user/auth')
export class UserController {

    constructor(
        private readonly userService: UsersService
    ){}



}