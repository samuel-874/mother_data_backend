import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RegisterationRequest } from "../dto/registeration.dto";
import { Roles } from "../entity/users.roles";


@Injectable()
export class ValidUserPipe implements PipeTransform {

    transform(value: RegisterationRequest, metadata: ArgumentMetadata) {
        if(value.role != Roles.USER && value.role != Roles.VENDOR) throw new BadRequestException("Unaccepted Role") ;
        return value;
    }

}