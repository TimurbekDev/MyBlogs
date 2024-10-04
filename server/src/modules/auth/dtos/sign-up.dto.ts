import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ISignUpRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto implements ISignUpRequest{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}