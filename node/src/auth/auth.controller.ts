import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) { }

    @Post('signTest')
    async siginIn(@Body() siginInDto: SignInDto) {
        return await this.authService.signIn(siginInDto)
    }

    @Post('signUp')
    async signUp(@Body() siginUpDto: SignUpDto) {
        return await this.authService.signIn(siginUpDto)
    }
}
