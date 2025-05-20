import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class GetProductosDto {
  // Filtro de búsqueda por nombre
  @IsOptional() // Indica que este campo es opcional
  @IsString()   // Asegura que el tipo es un string
  search: string = '';  // Asigna un valor predeterminado vacío ('') en caso de que no se pase ningún valor

  // Página actual
  @IsOptional()
  @IsInt() // Asegura que sea un número entero
  @Min(1)  // Asegura que la página sea al menos 1
  page: number = 1; // Valor predeterminado es 1 si no se pasa

  // Cantidad de productos por página
  @IsOptional()
  @IsInt() // Asegura que sea un número entero
  @Min(1)  // Asegura que el tamaño de la página sea al menos 1
  pageSize: number = 5; // Valor predeterminado es 5 si no se pasa

  // Filtro de categoría
  @IsOptional()
  @IsInt() // Asegura que sea un número entero
  categoryId?: number; // Este campo es opcional

  // Filtro de marca
  @IsOptional()
  @IsInt() // Asegura que sea un número entero
  brandId?: number; // Este campo es opcional
}
