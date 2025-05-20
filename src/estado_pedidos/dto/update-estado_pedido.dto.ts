import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoPedidoDto } from './create-estado_pedido.dto';

export class UpdateEstadoPedidoDto extends PartialType(CreateEstadoPedidoDto) {}
