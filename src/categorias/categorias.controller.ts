import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

import { Categoria } from './entities/categoria.entity';
import { CategoriaDto } from './dto/payload-categoria.dto';
import { GetCategoriasDto } from './dto/get-categoria.dto';
import { HabilitarDeshabilitar } from 'src/productos/dto/habilitarDeshabilitar.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriasService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }

  @Post('upload')
  async crearMarca(@Body() query:CategoriaDto){
    return this.categoriasService.crearCategoria(query)
  }
  @Put('edit/:id')
  async editarMarca(@Param('id') id: number,@Body() query:CategoriaDto){
    return this.categoriasService.editarCategoria(id,query)
  
  }
  @Get("tabla")
  async findTabla(@Query() query: GetCategoriasDto){
  return this.categoriasService.findTabla(query)
  }

  @Put('habilitarDeshabilitar')
     async habilitarDeshabilitar( @Body() query:HabilitarDeshabilitar){
       return this.categoriasService.habilitarDeshabilitar(query)
  }
}
