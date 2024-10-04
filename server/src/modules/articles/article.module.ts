import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Article, ArticleController, ArticleService, UserModule } from "@modules";

@Module({
    imports : [
        SequelizeModule.forFeature([Article]),
        forwardRef(()=>UserModule)
    ],
    controllers : [ArticleController],
    providers : [ArticleService],
    exports : [ArticleService]
})
export class ArticleModule {}