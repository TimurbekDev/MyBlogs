import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ICreateArticleRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto implements ICreateArticleRequest{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    image: any;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}