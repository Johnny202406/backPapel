import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categorias/entities/categoria.entity';
import { MarcasModule } from './marcas/marcas.module';
import { Marca } from './marcas/entities/marca.entity';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/entities/producto.entity';
import { ImagenesModule } from './imagenes/imagenes.module';
import { Imagene } from './imagenes/entities/imagene.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { DetallesPedidosModule } from './detalles_pedidos/detalles_pedidos.module';
import { EstadoPedidosModule } from './estado_pedidos/estado_pedidos.module';
import { Pedido } from './pedidos/entities/pedido.entity';
import { DetallesPedido } from './detalles_pedidos/entities/detalles_pedido.entity';
import { EstadoPedido } from './estado_pedidos/entities/estado_pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'papeleria',
      entities: [Categoria,Marca,Producto,Imagene,Pedido,DetallesPedido,EstadoPedido],
      synchronize: false, // solo para desarrollo
    }),
    CategoriasModule,
    MarcasModule,
    ProductosModule,
    ImagenesModule,
    PedidosModule,
    DetallesPedidosModule,
    EstadoPedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
