import { Injectable } from '@nestjs/common';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administradore.entity';
import { Repository } from 'typeorm';
import { RequireAuthDto } from 'src/auth/dto/require-auth.dto';

@Injectable()
export class AdministradoresService {
  constructor(
      @InjectRepository(Administrador)
      private readonly administradorRepository: Repository<Administrador>,
    ) {}
  create(createAdministradoreDto: CreateAdministradoreDto) {
    return 'This action adds a new administradore';
  }

  findAll() {
    return `This action returns all administradores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administradore`;
  }

  update(id: number, updateAdministradoreDto: UpdateAdministradoreDto) {
    return `This action updates a #${id} administradore`;
  }

  remove(id: number) {
    return `This action removes a #${id} administradore`;
  }
  async findAdmin(body:RequireAuthDto): Promise<Administrador | null> {
    return await this.administradorRepository.findOne({
        where: { username:body.username, contrasena: body.contrasena,habilitado:true },
      });
  }

}
