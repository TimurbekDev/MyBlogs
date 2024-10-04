import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { User } from "./models";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "@config";
import { Protected, Roles } from "@decorators";
import { CheckRoleGuard } from "@guards";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @Protected(true)
    @Roles(['admin'])
    @UseGuards(CheckRoleGuard)
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
    @Roles(['admin','user'])
    @UseGuards(CheckRoleGuard)
    async getAllUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Protected(true)
    @Get('/:userId')
    async getUserById(@Param('userId') id: number): Promise<User> {
        return await this.userService.findById(id);
    }

    @Patch('/:userId')
    @Protected(true)
    @Roles(['admin','user'])
    @UseGuards(CheckRoleGuard)
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
    @Protected(true)
    @Roles(['admin'])
    @UseGuards(CheckRoleGuard)
    async deleteUserById(@Param('userId') id: number): Promise<boolean> {
        return await this.userService.deleteById(id);
    }
}