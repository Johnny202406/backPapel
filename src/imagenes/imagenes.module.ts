import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagene } from './entities/imagene.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Imagene]),ProductosModule],
  controllers: [ImagenesController],
  providers: [ImagenesService],
  exports: [TypeOrmModule],
})
export class ImagenesModule {}
