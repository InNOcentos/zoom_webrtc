import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) { }

    @Post('signIn')
    async siginIn(@Body() siginInDto: SignInDto) {
        return await this.authService.signIn(siginInDto)
    }
}
