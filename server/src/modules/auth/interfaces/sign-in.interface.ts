export declare interface ISignInRequest {

    email : string,
    password : string
}

export declare interface ISignInResponse {

    full_name: string,
    email: string,
    role: string,
    access_token: string,
    refresh_token: string
}