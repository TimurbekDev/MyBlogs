import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { ISignInRequest, ISignInResponse, ISignUpRequest, ISignUpResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import { compare, hash } from "bcrypt";
import { User } from "../users";

@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtService) private jwtService: JwtService,
        @InjectModel(User) private userModel: typeof User,
        @Inject(ConfigService) private configService: ConfigService
    ) { }

    async signUp(payload: ISignUpRequest): Promise<ISignUpResponse> {
        const user = await this.userModel.findOne({
            where: {
                email: payload.email
            }
        })

        if (user)
            throw new BadRequestException('Email is already in use')

        const hashedPassword = await hash(payload.password,12)

        const newUser = await this.userModel.create({
            email: payload.email,
            password: hashedPassword,
            full_name: payload.full_name,
            role: 'user'
        })

        const tokenPayload = {
            id: newUser.id,
            role: newUser.role
        }

        const [access, refresh] = await Promise.all([
            await this.jwtService.signAsync(
                tokenPayload, {
                privateKey: this.configService.get<string>('jwtConfig.access_secret_key'),
                expiresIn: this.configService.get<string>('jwtConfig.access_expire_time')
            }),
            await this.jwtService.signAsync(
                tokenPayload, {
                privateKey: this.configService.get<string>('jwtConfig.refresh_secret_key'),
                expiresIn: this.configService.get<string>('jwtConfig.refresh_expire_time')
            })
        ])

        return {
            full_name: newUser.full_name,
            email: newUser.email,
            role: newUser.role,
            access_token: access,
            refresh_token: refresh
        }
    }

    async signIn(payload: ISignInRequest): Promise<ISignInResponse> {
        const { email, password } = payload;

        const existUser = await this.userModel.findOne({
            where: { email }
        })

        if(!existUser)
            throw new BadRequestException('Invalid email or password')

        const isMatchPassword = await compare(password,existUser.password)

        if(!isMatchPassword)
            throw new BadRequestException('Invalid email or password')

        const tokenPayload = {
            id: existUser.id,
            role: existUser.role
        }

        const [access, refresh] = await Promise.all([
            await this.jwtService.signAsync(
                tokenPayload, {
                privateKey: this.configService.get<string>('jwtConfig.access_secret_key'),
                expiresIn: this.configService.get<string>('jwtConfig.access_expire_time')
            }),
            await this.jwtService.signAsync(
                tokenPayload, {
                privateKey: this.configService.get<string>('jwtConfig.refresh_secret_key'),
                expiresIn: this.configService.get<string>('jwtConfig.refresh_expire_time')
            })
        ])

        return {
            full_name: existUser.full_name,
            email: existUser.email,
            role: existUser.role,
            access_token: access,
            refresh_token: refresh
        }
    }
}