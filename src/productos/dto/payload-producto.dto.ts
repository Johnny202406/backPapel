import { IsOptional, IsString, IsInt, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class ProductoDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  detalle?: string;

  @IsOptional()
  @IsInt()
  marcaId?: number;

  @IsOptional()
  @IsInt()
  categoriaId?: number;
}
