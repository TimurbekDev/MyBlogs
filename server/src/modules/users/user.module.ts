import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        SequelizeModule.forFeature([User])
    ],
    controllers : [UserController],
    providers: [UserService],
})
export class UserModule {}