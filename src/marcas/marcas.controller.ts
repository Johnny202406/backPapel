import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcaDto } from './dto/payload-marca.dto';
import { GetMarcasDto } from './dto/get-marca.dto';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto);
  }

  @Get()
  findAll() {
    return this.marcasService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.marcasService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcasService.update(+id, updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcasService.remove(+id);
  }

  @Post('upload')
  async crearMarca(@Body() query:MarcaDto){
    return this.marcasService.crearMarca(query)
  }
  @Put('edit/:id')
  async editarMarca(@Param('id') id: number,@Body() query:MarcaDto){
    return this.marcasService.editarMarca(id,query)
  
  }
   @Get("tabla")
   async findTabla(@Query() query: GetMarcasDto){
    return this.marcasService.findTabla(query)
   }
}
