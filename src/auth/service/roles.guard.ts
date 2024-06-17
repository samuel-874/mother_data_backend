import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./roles.decorator";


@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("entered role auth");
        
        const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
        ])

        if(!requiredRoles){
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
         // this is the role
         console.log("exiting role auth");
        return requiredRoles.some((role) => role === user.sub );
    }
}