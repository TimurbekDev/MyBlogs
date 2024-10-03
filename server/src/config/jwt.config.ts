export const jwtConfig = () =>({
    jwtConfig : {
        access_secret_key : process.env.ACCESS_TOKEN_SECRET_KEY,
        access_expire_time : process.env.ACCESS_TOKEN_EXPIRE_TIME,
        refresh_secret_key : process.env.REFRESH_TOKEN_SECRET_KEY,
        refresh_expire_time : process.env.REFRESH_TOKEN_EXPIRE_TIME
    }
})