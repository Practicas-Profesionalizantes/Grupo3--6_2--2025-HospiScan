import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  imports: [
    UsersModule,
    
    // crea y verifica JWT
    JwtModule.register({
      global: true,                    // permite utilizar el modulo jwt en toda la aplicacion
      secret: jwtConstants.secret,     // utiliza una clave secreta (normalmente en un .env)
      signOptions: { expiresIn: '1d' } // el token deja de ser valido después de x cantidad de tiempo de haberse generado
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
