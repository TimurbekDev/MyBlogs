import { join } from 'path';
import * as fs from 'fs/promises'
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { ICreateUserRequest, IUpdateUserRequest } from "./interfaces";
import { Article } from '../articles';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel : typeof User){}

    async create(payload : ICreateUserRequest):Promise<User>{
        const newUser = await this.userModel.create({
            full_name: payload.full_name,
            email: payload.email,
            password : payload.password,
            role : payload.role,
            image : payload.image
        })

        return await this.findById(newUser.id)
    }

    async findAll():Promise<User[]>{
        return await this.userModel.findAll({
            attributes : {
                exclude : ['password','updatedAt','createdAt']
            },
            include : [Article]
        });
    }

    async findById(id:number):Promise<User>{
        const user = await this.userModel.findByPk(id,{
            attributes : {
                exclude : ['password','updatedAt','createdAt']
            }
        })

        if(!user)
            throw new NotFoundException()

        return user
    }

    async updateById(payload : IUpdateUserRequest):Promise<User>{

        const user = await this.findById(payload.id)

        if(user.image)
            fs.unlink(join(__dirname,'..','..','..','uploads',user.image))

        await user.update({
            full_name: payload.full_name,
            email: payload.email,
            password : payload.password,
            role : payload.role,
            image :  payload.image
        })

        return await this.findById(user.id)

    }

    async deleteById(id:number):Promise<boolean>{

        const user = await this.findById(id)

        if(user.image)
            fs.unlink(join(__dirname,'..','..','..','uploads',user.image))

        await user.destroy()
        return true
    }
}