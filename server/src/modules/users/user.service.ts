import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { ICreateUserRequest, IUpdateUserRequest } from "./interfaces";

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
            }
        });
    }

    async findById(id:number):Promise<User>{
        const user = await this.userModel.findByPk(id,{
            attributes : {
                exclude : ['password']
            }
        })

        if(!user)
            throw new NotFoundException()

        return user
    }

    async updateById(payload : IUpdateUserRequest):Promise<User>{

        const user = await (await this.findById(payload.id)).update({
                full_name : payload.full_name,
                email : payload.email,
                password : payload.password,
                role : payload.role,
                image : payload.image
            }
        )

        return  user
    }

    async deleteById(id:number):Promise<boolean>{

        await (await this.findById(id)).destroy()

        return true
    }
}