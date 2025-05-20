import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesPedidoDto } from './create-detalles_pedido.dto';

export class UpdateDetallesPedidoDto extends PartialType(CreateDetallesPedidoDto) {}
