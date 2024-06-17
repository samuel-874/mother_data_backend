import { Users } from "src/users/entity/users.entity";
import { AuthResponse } from "./auth-response.dto";
import { mapToUserDTO } from "src/users/service/users.utilities";


export function mapToAuthResponse(access_token: string, user: Users ){
    const dto = new AuthResponse();
    dto.access_token = access_token;
    dto.user = mapToUserDTO(user);

    return dto;
} 