import { IsEmail, IsNumber, IsNumberString, IsOptional, IsPositive, Length, MaxLength, MinLength, maxLength } from "class-validator";


export class OTPRequest {

    @IsEmail()
    email: string;

    @IsOptional()
    @MinLength(6,{ message: "Validation Failed: Invalid OTP"})
    @MaxLength(6,{ message: "Validation Failed: Invalid OTP"})
    @IsNumberString()
    otp: string;

}
