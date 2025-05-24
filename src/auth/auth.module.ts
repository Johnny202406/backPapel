import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdministradoresModule } from 'src/administradores/administradores.module';

@Module({
  imports:[AdministradoresModule,],
  controllers: [AuthController,],
  providers: [AuthService],
})
export class AuthModule {}
