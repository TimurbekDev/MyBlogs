import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports : [
        SequelizeModule.forFeature([User])
    ],
    controllers : [AuthController],
    providers : [ConfigService , JwtService , AuthService]
})
export class AuthModule {}