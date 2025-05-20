import { IsString, IsArray, IsNumber, IsObject } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  dni: string;

  @IsString()
  contacto: string;

  @IsArray()
  @IsObject({ each: true })  // Asegura que cada elemento en el array sea un objeto
  detalles: DetallePedido[];
}

class DetallePedido {
  @IsNumber()
  idproducto: number;

  @IsNumber()
  cantidad: number;
}
