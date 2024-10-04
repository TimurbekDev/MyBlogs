import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Article } from "./models";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { User } from "../users";

@Module({
    imports : [
        SequelizeModule.forFeature([Article,User])
    ],
    controllers : [ArticleController],
    providers : [ArticleService]
})
export class ArticleModule {}