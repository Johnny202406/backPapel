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
import { AuthModule } from './auth/auth.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { Administrador } from './administradores/entities/administradore.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ADDON_HOST,
      port: 3306,
      username: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      entities: [Categoria,Marca,Producto,Imagene,Pedido,DetallesPedido,EstadoPedido,Administrador],
      synchronize: false, // solo para desarrollo
    }),
    CategoriasModule,
    MarcasModule,
    ProductosModule,
    ImagenesModule,
    PedidosModule,
    DetallesPedidosModule,
    EstadoPedidosModule,
    AuthModule,
    AdministradoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

