import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    // En la ruta Register se hace un Post
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
        return this.authService.register(registerDto);
    }

    // En la ruta Login se hace un Post
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    // Para obtener la ruta de los datos del perfil, necesitamos el token bearer
    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req) {
        return req.user;
    }
}