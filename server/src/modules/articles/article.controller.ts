import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "@config";
import { ArticleService } from "./article.service";
import { CreateArticleDto, UpdateArticleDto } from "./dtos";
import { Article } from "./models";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async addAricle(
        @Body() createArticleDto: CreateArticleDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<Article> {
        if (image)
            createArticleDto.image = image.filename
        return await this.articleService.create(createArticleDto)
    }

    @Get()
    async getAllArticles(): Promise<Article[]> {
        return await this.articleService.findAll();
    }

    @Get('/:articleId')
    async getArticleById(@Param('articleId') id: number): Promise<Article> {
        return await this.articleService.findById(id);
    }

    @Patch('/:articleId')
    @UseInterceptors(FileInterceptor('image',multerConfig))
    async updateArticleById(
        @Param('articleId') id: number,
        @Body() updateArticleDto: UpdateArticleDto,
        @UploadedFile() image :  Express.Multer.File
    ): Promise<Article> {
        if (image)
            updateArticleDto.image = image.filename
        return await this.articleService.updateById({
            ...updateArticleDto,
            id
        });
    }

    @Delete('/:articleId')
    async deleteArticleById(@Param('articleId') id: number): Promise<boolean> {
        return await this.articleService.deleteById(id);
    }
}