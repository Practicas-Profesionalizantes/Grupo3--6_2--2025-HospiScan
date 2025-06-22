import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register({ name, email, password }: RegisterDto){
        // para asegurarse de que no estén repetidos los emails, primero lo verificamos
        const user = await this.userService.findOnebyEmail(email)

        if (user){
            throw new BadRequestException('User Existente')
        }
        // manda los datos a la base de datos para que se registren
        return await this.userService.create({ 
            name, 
            email,
            password: await bcryptjs.hash(password, 10) // el hash asegura que incluso si hay dos contraseñas iguales, se encripten como si fueran distintas
        });
    }
    
    async login({ email, password }){
        const user = await this.userService.findOnebyEmail(email)

        if (!user) {
            throw new UnauthorizedException('Email Incorrecto')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña Incorrecta')
        }

        const payload = {email: user.email};

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
        };
    }
}
