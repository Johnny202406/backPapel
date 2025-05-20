import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsArray, IsInt } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    
    @IsInt()
    idestado?: number = 1;
    
    @IsArray()
    pedidos?: number[] ;
    
}
