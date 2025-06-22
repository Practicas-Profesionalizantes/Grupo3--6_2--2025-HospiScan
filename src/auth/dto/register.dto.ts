import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

// Se comporta como un validador para 
// asegurar que todos los datos que sean mandados
// estén en un formato correcto
export class RegisterDto {

    @IsString()
    @MinLength(4)
    @Transform(({value}) => value.trim())
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    password: string;
}