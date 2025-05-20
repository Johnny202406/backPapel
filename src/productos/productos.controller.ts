import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { GetProductosDto } from './dto/get-productos.dto'
import { GetProductosDtoCliente } from './dto/get-productos-cliente.dto';
import { ProductoDto } from './dto/payload-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()

  async getProductos(@Query() query: GetProductosDto) {
    // `query` contendrá los parámetros de búsqueda, paginación, etc.
    const { search, page, pageSize, categoryId, brandId } = query;

    // Llamada al servicio para obtener los productos basados en los filtros
    const productos = await this.productosService.getProductos(
      page,
      pageSize,
      search,
      categoryId,
      brandId
    );

    return productos;
  }

  // findAll() {
  //   return this.productosService.findAll();
  // }

  @Get('one/:param')
  findOne(@Param('param') param: number) {
    return this.productosService.findOne(param);
  }
  @Get('oneString/:param')
  findOneString(@Param('param') param: string) {
    return this.productosService.findOnePorNombreoCodigo(param);
  }

  @Get('last/:length')
  findLast(@Param('length') id: number) {
    return this.productosService.findLast(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(+id);
  }

  @Get('cliente')
async getProductosCliente(@Query() query: GetProductosDtoCliente) {
  const {
    page = 1,
    pageSize = 10,
    search,
    categoria,
    marcas ,
    minPrice,
    maxPrice,
    onlyStock,
    sort,
    length,
    productoRefer
  } = query;

  const result = await this.productosService.getProductosCliente(
    page,
    pageSize,
    search,
    categoria,
    marcas,
    minPrice,
    maxPrice,
    onlyStock,
    sort,
    length,
    productoRefer
  );
  
  return result;
}

@Post('upload')
async crearProducto(@Body() query:ProductoDto){
  return this.productosService.crearProducto(query)
}
@Put('edit/:id')
async editarProducto(@Param('id') id: number,@Body() query:ProductoDto){
  return this.productosService.editarProducto(id,query)

}

  
}
