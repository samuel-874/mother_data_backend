import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, Length, MinLength, min } from "class-validator";
import { Roles } from "../entity/users.roles";


export class RegisterationRequest {

    @IsNotEmpty({ message: 'fullName is mandatory' })
    fullName: string;

    @IsEmail()
    email: string;

    @MinLength(6, { message: 'password must be atleat 6 character' })
    password: string;

    @IsNotEmpty({message: 'phoneNumber is required' })
    phoneNumber: string;

    @IsEnum(Roles,{message: `role must be any of the following ${Roles.USER} OR ${Roles.VENDOR}`})
    role: Roles;

}