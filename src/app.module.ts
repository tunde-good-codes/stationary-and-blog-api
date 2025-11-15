import { AccessTokenGuard } from "src/auth/guards/access-token.guard.ts/access-token.guard.ts.guard";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/userEntity";
import { TagsModule } from "./tags/tags.module";
import { MetaOptionsModule } from "./meta-options/meta-options.module";
import { appConfig } from "config/app.config";
import { PaginationModule } from "./pagination/pagination.module";
import jwtConfig from "./auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard.ts/authentication.guard";
import { DataResponseInterceptor } from "./no-spec/common/interceptors/data-response/data-response.interceptor";
import { UploadsModule } from "./uploads/uploads.module";
import { MailModule } from "./mail/mail.module";

const env = "development";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //makes env file available app wide
      envFilePath: !env ? ".env" : `.env.${env}`,
      load: [appConfig, jwtConfig]
    }),

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        autoLoadEntities: true, // no need to add entities manually
        synchronize: true, // set to false in production
        ssl: {
          rejectUnauthorized: false // needed for Neon
        },
        entities: [User]
      })
    }),

    UserModule,
    PostModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    UploadsModule,
    MailModule
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor
    },
    AccessTokenGuard
  ]
})
export class AppModule {}
