import { ICreateArticleRequest } from "./create-article.interface";

export declare interface IUpdateArticleRequest{
    title : string,
    description : string,
    image : string,
    id : number
}