import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/users/entity/users.roles";


export const ROLE_KEY = 'ROLE_KEY';
export const Permit = (roles: Roles[]) => SetMetadata(ROLE_KEY, roles);