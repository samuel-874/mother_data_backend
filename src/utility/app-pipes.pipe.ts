import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RegisterationRequest } from "../auth/dtos/registeration.dto";
import { Roles } from "../users/entity/users.roles";


@Injectable()
export class ValidUserPipe implements PipeTransform {

    transform(value: RegisterationRequest, metadata: ArgumentMetadata) {
        if(value.role != Roles.USER && value.role != Roles.VENDOR) throw new BadRequestException("Unaccepted Role") ;
        return value;
    }

}