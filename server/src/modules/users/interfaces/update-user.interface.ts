import { ICreateUserRequest } from "./create-user.interface";

export declare interface IUpdateUserRequest extends Partial<ICreateUserRequest>{
    id : number
}