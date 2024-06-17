import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { AuthRequest } from '../dtos/auth-request.dto';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegRoute } from 'src/users/entity/user.route';
import { mapToAuthResponse } from '../dtos/auth.utilities';
import { AuthResponse } from '../dtos/auth-response.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

   async signInUser(request: AuthRequest): Promise<AuthResponse>{
        const username = request.username;

        // TODO: check if the user did not regsiter vai Social Login i.e google | facebook signIn
        const user = await this.userService.findByEmail(username);
        const match = await Bcrypt.compare(request.password,user?.password);

        if(!match) throw new UnauthorizedException("Username Or Password Incorrect");
        user.lastLogin = new Date();
        await this.userService.saveUser(user);

        const payload = { sub: user.role, username: user.email, reg_route: user.regRoute };
        const access_token = await this.jwtService.signAsync(payload);

        return mapToAuthResponse(access_token,user);
    }
}
