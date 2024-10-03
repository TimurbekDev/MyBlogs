import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dtos";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @Post('/sign-up')
    async signUp(@Body()  signUp : SignUpDto){
        return await this.authService.signUp(signUp)
    }

    @Post('/sign-in')
    async signIn(@Body() signIn : SignInDto){
        return await this.authService.signIn(signIn)
    }
}