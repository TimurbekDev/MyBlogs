import { join } from 'path';
import * as fs from 'fs/promises'
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Article } from "./models";
import {  UserService } from "../users";
import { ICreateArticleRequest, IUpdateArticleRequest } from "./interfaces";

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article) private articleModel: typeof Article,
        @Inject(UserService) private userService: UserService
    ) { }

    async create(payload: ICreateArticleRequest): Promise<Article> {

        const user = await this.userService.findById(payload.user_id)
        if (!user)
            throw new NotFoundException('User not found')

        const newUser = await this.articleModel.create({
            title: payload.title,
            description: payload.description,
            user_id: payload.user_id,
            image: payload.image
        })

        return await this.findById(newUser.id)
    }

    async findAll(): Promise<Article[]> {
        return await this.articleModel.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })
    }

    async findById(id: number): Promise<Article> {
        const article = await this.articleModel.findByPk(id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })
        if (!article)
            throw new NotFoundException('Article not found')

        return article
    }

    async updateById(payload: IUpdateArticleRequest): Promise<Article> {
        const article = await this.findById(payload.id)

        if (!article)
            throw new NotFoundException('Article not found')
        if (article.image)
            fs.unlink(join(__dirname, '..', '..', '..', 'uploads', article.image))

        await article.update({
            title: payload.title,
            description: payload.description,
            image: payload.image
        })

        return await this.findById(payload.id)
    }

    async deleteById(id: number): Promise<boolean> {

        const article = await this.findById(id)

        if (article.image)
            fs.unlink(join(__dirname, '..', '..', '..', 'uploads', article.image))

        await article.destroy()
        return true
    }
}