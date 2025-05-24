import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RequireAuthDto } from './dto/require-auth.dto';
import { AdministradoresService } from 'src/administradores/administradores.service';

@Injectable()
export class AuthService {
  constructor(
    private administradoresService: AdministradoresService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async login(body:RequireAuthDto){
    const admin = await this.administradoresService.findAdmin(body);
    if (!admin) throw new UnauthorizedException('Credenciales inválidas');
    return admin;
  }
}
