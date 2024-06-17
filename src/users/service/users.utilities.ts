import { UsersDTO } from "../dto/users.dto";
import { WalletsDTO } from "../dto/wallets.dto";
import { Users } from "../entity/users.entity";


export const mapToUserDTO = (user: Users): UsersDTO => {

    const userDTO = new UsersDTO();

    userDTO.id = user.id;
    userDTO.fullName = user.fullName;
    userDTO.email = user.email;
    userDTO.profilePic = user.profilePic;
    userDTO.phoneNumber = user.phoneNumber;
    userDTO.wallet = new WalletsDTO();
    userDTO.lastLogin = user.lastLogin;

    return userDTO;
}