import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Article } from "./models";
import { ArticleController } from "./article.controller";
import { User } from "../users";

@Module({
    imports : [
        SequelizeModule.forFeature([Article,User])
    ],
    controllers : [ArticleController],
    providers : [ArticleService]
})
export class ArticleModule {}