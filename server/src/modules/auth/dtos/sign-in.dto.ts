import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignInRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto implements ISignInRequest {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}