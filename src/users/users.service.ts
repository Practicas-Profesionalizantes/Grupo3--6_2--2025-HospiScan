import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) // Pide acceso para hacer consultas y operaciones en la entidad
    private readonly userRepository: Repository<User>, // Para no tener que hacer queries, se utiliza la función de repository
  ) {}

  // crea al usuario
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // busca a un usuario dependiendo del email
  findOnebyEmail(email: string){
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
