import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/users.model';
import { SignInDto, SignUpDto } from './dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import { bcryptSalt } from './constants';
import { jwtTokensConfig } from './constants'

@Injectable()
export class AuthService {
    constructor (@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService) { }

    public async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto
        const user = await this.userModel.findOne({ email })
        if (!user || !(this.matchPassword(password, user?.password))) throw new UnauthorizedException('Credentials are incorrect')

        const payload = { 
            id: user?.id,
            name: user?.name
        }

        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload, {expiresIn: jwtTokensConfig.refreshTokenExpires})
        }
    }

    public async signUp(signUpDto: SignUpDto) {
        const { name, email, password } = signUpDto
        const user = await this.userModel.findOne({ email })
        if (user) throw new Error('123')

        const { id } = await this.userModel.create({ ...signUpDto, password: this.hashPassword(password) })

        const payload = {
            id,
            name
        }

        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload, {expiresIn: jwtTokensConfig.refreshTokenExpires})
        }
    }

    public generateAccessToken(payload: Record<string, any>) {
        return this.jwtService.signAsync(payload)
    }

    public generateRefreshToken(payload: Record<string, any>, options: Record<string, any>) {
        return this.jwtService.signAsync(payload, options)
    }

    private async matchPassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, bcryptSalt)
    }
}