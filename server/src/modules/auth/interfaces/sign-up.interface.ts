export declare interface ISignUpRequest {

    full_name: string,
    email: string,
    password: string
}

export declare interface ISignUpResponse {

    full_name: string,
    email: string,
    role: string,
    access_token: string,
    refresh_token: string
}