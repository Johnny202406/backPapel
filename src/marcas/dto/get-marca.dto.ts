import { IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

export class GetMarcasDto {
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  pageSize?: number = 5;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  estado?: string|boolean;
}