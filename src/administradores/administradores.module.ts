import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administradore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
  exports: [AdministradoresService],
})
export class AdministradoresModule {}
