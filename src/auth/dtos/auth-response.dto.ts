import { UsersDTO } from "src/users/dto/users.dto";


export class AuthResponse {
    user: UsersDTO;
    access_token: string;
    refresh_token: string;
}