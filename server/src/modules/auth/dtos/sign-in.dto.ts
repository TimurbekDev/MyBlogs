import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignInRequest } from "../interfaces";

export class SignInDto implements ISignInRequest {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}