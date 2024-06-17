import { Roles } from "../entity/users.roles";
import { WalletsDTO } from "./wallets.dto";


export class UsersDTO {

    id: number;

    fullName: string;

    email: string;

    profilePic: string;

    phoneNumber: string;

    wallet: WalletsDTO;

    lastLogin: Date;

    emailVerified: boolean;

    profileCompleted: boolean;

    role: Roles;
}