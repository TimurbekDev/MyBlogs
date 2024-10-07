import { appConfig, dbConfig, jwtConfig } from "@config";
import { CheckAuthGuard, CheckRoleGuard } from "@guards";
import { Article, ArticleModule, AuthModule, User, UserModule } from "@modules";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig , jwtConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('dbConfig.host'),
        port: config.get<number>('dbConfig.port'),
        username: config.get<string>('dbConfig.user'),
        password: config.get<string>('dbConfig.password'),
        database: config.get<string>('dbConfig.dbName'),
        autoLoadModels: true,
        synchronize: true,
        models: [User, Article],
        logging: false,
        sync: {
          alter: true,
          // force : true
        }
      }),
    }),
    UserModule,
    ArticleModule,
    AuthModule,
    JwtModule
  ],
  controllers: [],
  // providers: [{
  //   useClass : CheckAuthGuard,
  //   provide : APP_GUARD
  // }],
})
export class AppModule { };
