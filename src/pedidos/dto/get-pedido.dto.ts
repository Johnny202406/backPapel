import { IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

export class GetPedidosDto {
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  pageSize?: number = 5;

  @IsOptional()
  @IsDateString()
  dia?: string = new Date().toISOString().split('T')[0];

  @IsOptional()
  @IsInt()
  idestado?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
