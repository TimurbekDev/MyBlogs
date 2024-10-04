import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import { User } from "./models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Article } from "../articles";

@Module({
    imports: [
        SequelizeModule.forFeature([User,Article])
    ],
    controllers: [UserController],
    providers: [UserService, JwtService]
})
export class UserModule { }