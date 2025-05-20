import { IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

export class GetCategoriasDto {
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  pageSize?: number = 5;

  @IsOptional()
  @IsString()
  search?: string;
}