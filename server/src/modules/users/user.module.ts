import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import {ArticleModule, User, UserController, UserService} from '@modules'
@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(()=>ArticleModule)
    ],
    controllers: [UserController],
    providers: [UserService, JwtService],
    exports : [UserService]
})
export class UserModule { }