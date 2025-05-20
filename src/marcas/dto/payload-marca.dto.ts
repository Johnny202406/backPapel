import { IsOptional, IsString, IsInt, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class MarcaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
