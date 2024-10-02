import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseFilters, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { User } from "./models";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "@config";
import { Protected } from "@decorators";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @Protected(true)
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async addUser(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<User> {
        if (image)
            createUserDto.image = image.filename
        return await this.userService.create(createUserDto)
    }

    @Get()
    @Protected(true)
    async getAllUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:userId')
    async getUserById(@Param('userId') id: number): Promise<User> {
        return await this.userService.findById(id);
    }

    @Patch('/:userId')
    @UseInterceptors(FileInterceptor('image',multerConfig))
    async updateUserById(
        @Param('userId') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @UploadedFile() image :  Express.Multer.File
    ): Promise<User> {
        if (image)
            updateUserDto.image = image.filename

        return await this.userService.updateById({
            ...updateUserDto,
            id
        });
    }

    @Delete('/:userId')
    async deleteUserById(@Param('userId') id: number): Promise<boolean> {
        return await this.userService.deleteById(id);
    }
}