export const appConfig = () =>({
    appConfig : {
        port : Number(process.env.APP_PORT),
        host : process.env.APP_HOST
    }
})