import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRoles } from "../enums";
import { ICreateUserRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto implements ICreateUserRequest{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4,{
        message : 'Username must be at least 4 characters long',
    })
    @MaxLength(50,{
        message  : 'Username must be at most 50 characters long',
    })
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRoles,{
        message: "Invalid User Role",
        
    })
    role : UserRoles;

    image: any; 
}