import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService, TokenExpiredError } from '@nestjs/jwt';
  import { Request } from 'express';
  import * as dotenv from "dotenv";
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_JEY } from './public.decorator';

  dotenv.config();

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_JEY,[
        context.getHandler(),
        context.getClass()
      ])

      if(isPublic){
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          { secret: process.env.SECRET_KEY }
        );


        // console.log(payload);

        request['user'] = payload;
      } catch (e) {
        if(e instanceof TokenExpiredError ) throw new UnauthorizedException("Expired Token");
        console.log(e);
        throw new UnauthorizedException();
      }

      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader: any = request.headers["mother-access-key"];
      const [type, token] = authHeader?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }