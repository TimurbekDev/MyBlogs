import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ICreateArticleRequest } from "../interfaces";

export class CreateArticleDto implements ICreateArticleRequest{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    image: any;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}