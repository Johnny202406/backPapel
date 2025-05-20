import { IsOptional, IsString, IsNumber, IsBoolean, IsInt, IsArray } from 'class-validator';

export class GetProductosDtoCliente {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  categoria: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  marcas: string[];

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsBoolean()
  onlyStock: boolean;

  @IsOptional()
  @IsString()
  sort: string;
  
  @IsOptional()
  @IsInt()
  length: number;

  @IsOptional()
  @IsString()
  productoRefer: string;
}
