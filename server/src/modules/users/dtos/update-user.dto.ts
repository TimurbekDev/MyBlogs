import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IUpdateUserRequest } from "../interfaces";

export class UpdateUserDto implements Omit<IUpdateUserRequest,'id'>{

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    full_name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    image_url: string;
}