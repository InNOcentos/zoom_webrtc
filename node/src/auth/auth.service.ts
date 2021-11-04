import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/users.model';
import { SignInDto, SignUpDto } from './dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import { bcryptSalt } from './constants';

@Injectable()
export class AuthService {
    constructor (@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService) { }

    public async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto
        const user = await this.userModel.findOne({ email })
        if (!user || !(this.matchPassword(password, user?.password))) throw new UnauthorizedException('Credentials are incorrect')

        return this.signUser(user?.id, user?.email, user?.name)
    }

    public async signUp(signUpDto: SignUpDto) {
        const { name, email, password } = signUpDto
        const user = await this.userModel.findOne({ email })
        if (user) throw new Error('123')

        const { id } = await this.userModel.create({ ...signUpDto, password: this.hashPassword(password) })
        return this.signUser(id, email, name)
    }

    private signUser(id: number, email: string, name: string) {
        return this.jwtService.sign({
            sub: id,
            email,
            name
        })
    }

    private async matchPassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, bcryptSalt)
    }
}