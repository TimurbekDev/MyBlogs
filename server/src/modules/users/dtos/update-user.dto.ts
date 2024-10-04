import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IUpdateUserRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto implements Omit<IUpdateUserRequest,'id'>{

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    full_name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    image: any;
}