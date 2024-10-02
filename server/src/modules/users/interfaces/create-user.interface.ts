import { UserRoles } from "../enums";

export declare interface ICreateUserRequest {

    full_name : string,
    email : string,
    password : string,
    role : UserRoles,
    image :  string
}