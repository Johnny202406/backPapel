import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { CreateImageneDto } from './dto/create-imagene.dto';
import { UpdateImageneDto } from './dto/update-imagene.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Imagene } from './entities/imagene.entity';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Post(':idproducto/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@Param('idproducto') idproducto: number, @UploadedFiles() files: Express.Multer.File[]) {
    return this.imagenesService.subirImagenes(idproducto,files);
  }

  @Get()
  findAll() {
    return this.imagenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageneDto: UpdateImageneDto) {
    return this.imagenesService.update(+id, updateImageneDto);
  }

  @Delete(':id/delete')
  remove(@Param('id') id: number) {
    return this.imagenesService.remove(id);
  }
}
