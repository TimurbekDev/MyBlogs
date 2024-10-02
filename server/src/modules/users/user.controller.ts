import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { User } from "./models";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/add')
    async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto)
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('/:userId')
    async getUserById(@Param('userId') id: number): Promise<User> {
        return await this.userService.findById(id);
    }

    @Patch('/:userId')
    async updateUserById(
        @Param('userId') id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
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