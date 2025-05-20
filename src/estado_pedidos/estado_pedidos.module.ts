import { Module } from '@nestjs/common';
import { EstadoPedidosService } from './estado_pedidos.service';
import { EstadoPedidosController } from './estado_pedidos.controller';
import { EstadoPedido } from './entities/estado_pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPedido])],
  controllers: [EstadoPedidosController],
  providers: [EstadoPedidosService],
})
export class EstadoPedidosModule {}
