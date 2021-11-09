import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor (private appService: AppService) { }

    @Get('/')
    async getHello() {
        return 'main page'
    }

    @Post('/')
    async test213(str: number) {
        return '123123'
    }
}
