import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { AuthRequest } from '../dtos/auth-request.dto';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegRoute } from 'src/users/entity/user.route';
import { mapToAuthResponse } from '../dtos/auth.utilities';
import { AuthResponse } from '../dtos/auth-response.dto';
import * as dotenv from "dotenv";
import { Users } from 'src/users/entity/users.entity';

dotenv.config();
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
        const refresh_token =  await this.generateRefreshToken(payload);;
        return mapToAuthResponse(access_token,refresh_token,user);
    }

    async refreshToken(access_token: string){
        try {
            const payload = await this.jwtService.verifyAsync(
              access_token,
              { secret: process.env.REFRESH_KEY }
            );
            const email = payload.username;
            const user = await this.userService.findByEmail(email);
            if(!user)   throw new UnauthorizedException();
            // console.log(payload);
            const jwt_payload = { sub: user.role, username: user.email, reg_route: user.regRoute };
            return {
                access_token: await this.jwtService.signAsync(jwt_payload)
            }
    
          } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
          }
    }

    private async generateRefreshToken(payload){        
        const access_token = await this.jwtService.signAsync(payload,{
            secret: process.env.REFRESH_KEY,
            expiresIn: '1d'
        });

        return access_token;
    }
}
