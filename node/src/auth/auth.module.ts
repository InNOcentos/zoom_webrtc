import { Module, Post } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtTokensConfig } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';

const {accessTokenExpires, accessTokenSecret} = jwtTokensConfig

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        // auth token secret
        JwtModule.register({
            secret: accessTokenExpires,
            signOptions: {
                expiresIn: accessTokenSecret
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy]
})
export class AuthModule { }