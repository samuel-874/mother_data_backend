import { IsEmail, IsOptional, MinLength, MaxLength, IsNumberString } from "class-validator"


export class PasswordReset{
    @IsEmail()
    email: string;

    @MinLength(6,{ message: "Validation Failed: Invalid OTP"})
    @MaxLength(6,{ message: "Validation Failed: Invalid OTP"})
    @IsNumberString()
    otp: string;

    @MinLength(6,{ message: "Validation Failed: Invalid OTP"})
    new_password: string;
}