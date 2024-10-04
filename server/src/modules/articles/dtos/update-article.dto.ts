import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IUpdateArticleRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateArticleDto implements IUpdateArticleRequest{

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    id : number
}