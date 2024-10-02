import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IUpdateArticleRequest } from "../interfaces";

export class UpdateArticleDto implements IUpdateArticleRequest{

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsNumberString()
    id : number
}