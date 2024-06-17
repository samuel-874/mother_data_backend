import { UsersDTO } from "src/users/dto/users.dto";


export class AuthResponse {
    access_token: string;
    user: UsersDTO 
}