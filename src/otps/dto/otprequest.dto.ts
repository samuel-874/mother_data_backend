import { IsEmail, IsOptional, Length } from "class-validator";


export class OTPRequest {

    @IsEmail()
    email: string;

    @IsOptional()
    @Length(6)
    otp: number;

}