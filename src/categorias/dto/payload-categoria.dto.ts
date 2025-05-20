import { IsOptional, IsString, IsInt, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}