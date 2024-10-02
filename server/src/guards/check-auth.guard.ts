import { Protected } from "@decorators";
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class CheckAuthGuard implements CanActivate {
    constructor(private reflector : Reflector){}
    canActivate(context: ExecutionContext)
    : boolean 
    | Promise<boolean> 
    | Observable<boolean> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()

        const isProtected = this.reflector.get(Protected, context.getHandler());

        const bearerToken = request.headers['authorization']

        if(!(bearerToken && 
            bearerToken.startsWith("Bearer ") && 
            bearerToken.split("Bearer ")[1]?.length
        ))
            throw new BadRequestException('Please  provide a valid token')

        const accessToken = bearerToken.split("Bearer ")[1]
        console.log(isProtected);    

        return true
    }
}