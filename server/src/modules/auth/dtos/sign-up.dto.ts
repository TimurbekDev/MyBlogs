import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignUpRequest } from "../interfaces";

export class SignUpDto implements ISignUpRequest{

    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}