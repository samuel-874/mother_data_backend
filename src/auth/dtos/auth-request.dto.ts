import { IsNotEmpty, MinLength } from "class-validator";

export class AuthRequest{

    @IsNotEmpty({ message: "username is required" })
    username: string;

    @IsNotEmpty({ message: "password is required" })
    @MinLength(6,{
        message: "password must be 6 digit and above"
    })
    password: string;
}