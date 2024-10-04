import { Protected } from "@decorators";
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }
    canActivate(context: ExecutionContext)
        : boolean
        | Promise<boolean>
        | Observable<boolean> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()

        const isProtected = this.reflector.get(Protected, context.getHandler());

        if (isProtected) {
            const bearerToken = request.headers['authorization']

            if (!(bearerToken &&
                bearerToken.startsWith("Bearer ") &&
                bearerToken.split("Bearer ")[1]?.length
            ))
                throw new BadRequestException('Please provide a valid token')

            const accessToken = bearerToken.split("Bearer ")[1]

            const {_ , role} = this.jwtService.verify(accessToken, {
                secret: this.configService.get<string>('jwtConfig.access_secret_key')
            })
                        
            request.headers.role = role

            return true
        }

        return true
    }
}