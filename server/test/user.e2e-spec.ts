import { Article, ArticleModule, AuthModule, User, UserModule } from "@modules"
import { INestApplication } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import {Test} from "@nestjs/testing"
import { Sequelize } from "sequelize-typescript"
import * as request from 'supertest'

describe('User e2e',()=>{

    let app : INestApplication;
    let sequelize :Sequelize;

    beforeAll(async ()=>{
        const moduleRef = await Test.createTestingModule({
            imports : [
                ConfigModule.forRoot({
                    envFilePath : '.env.test'
                }),
                SequelizeModule.forRoot({
                    dialect : 'postgres',
                    host : process.env.DB_HOST,
                    port : parseInt(process.env.DB_PORT),
                    username : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME,
                    models : [Article,User],
                    autoLoadModels : true,
                    synchronize : true,
                    sync : {force : true},
                    logging : false
                }),
                ArticleModule,
                UserModule,
                AuthModule
            ],
        }).compile()


        app = moduleRef.createNestApplication();
        await app.init()

        sequelize = moduleRef.get<Sequelize>(Sequelize)
    })


    afterAll(async ()=>{
        await app.close()
        await sequelize.close()
    })

    it('/Post user',async ()=>{
        const user = {
            email : 'test1@gmail.com',
            password : '123456',
            full_name : 'test',
            role : 'user'
        }
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(user)
            
        const userRes = response.body
        console.log(userRes);
        

        expect(userRes.full_name).toEqual(user.full_name)
    })


    it('/Get user',async ()=>{
        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
    })

    it('/PUT user',async ()=>{
        const user = {
            email : 'test@gmail.com',
            password : '123456',
            full_name : 'new',
            role : 'user'
        }

        const response = await request(app.getHttpServer())
            .patch('/users/1')
            

        const userRes = response.body

        expect(userRes.full_name).toEqual(user.full_name)
    })

    it('/DELETE user',async ()=>{

        const response = await request(app.getHttpServer())
            .delete('/users/1')

        expect(response.body).toBeDefined()
    })
})