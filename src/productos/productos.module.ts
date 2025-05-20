import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Imagene } from 'src/imagenes/entities/imagene.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto,Marca,Categoria,Imagene]),  // Registra el repositorio de Producto aquí
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
