import { Injectable } from '@nestjs/common';
import { CreateImageneDto } from './dto/create-imagene.dto';
import { UpdateImageneDto } from './dto/update-imagene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Imagene } from './entities/imagene.entity';
import { Repository } from 'typeorm';
import { cloudinary } from 'src/cloudinary/cloudinary';
import { ProductosService } from 'src/productos/productos.service';


@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagene)
    private imagenRepository: Repository<Imagene>,
    private productosService: ProductosService,
  ) {}

  async subirImagenes( idproducto: number,files: Express.Multer.File[]) {
    const maxImgs = 4;
  
    const currentImgCount = await this.imagenRepository.count({ where: { idproducto } });
  
    if (currentImgCount >= maxImgs) {
      throw new Error(`Solo puedes subir hasta ${maxImgs} imágenes para este producto.`);
    }
  
  
  
  
    const filesToUpload = files.slice(0, maxImgs - currentImgCount);
  
    const uploadPromises = filesToUpload.map((file) =>
      new Promise<Imagene>((resolve, reject) => {
        const res = cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
          if (error) {
            return reject('Error en Cloudinary');
          }
  
          try {
            const nueva = this.imagenRepository.create({
              url: result?.secure_url,
              idproducto,
            });
            const savedImagen = await this.imagenRepository.save(nueva);
            resolve(savedImagen);
          } catch (err) {
            reject('Error al guardar la imagen en la base de datos');
          }
        });
  
        const stream = res as NodeJS.WritableStream;
        stream.end(file.buffer);
      })
    );
  
    try {
      // Esperar que todas las imágenes se suban antes de devolver el resultado
      await Promise.all(uploadPromises);
  
      // Después de subir y guardar las imágenes, retornar el producto actualizado
      return await this.productosService.findOne(idproducto);
    } catch (err) {
      throw new Error(`Error al subir imágenes: ${err}`);
    }
  }
  

  create(createImageneDto: CreateImageneDto) {
    return 'This action adds a new imagene';
  }

  findAll() {
    return `This action returns all imagenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagene`;
  }

  update(id: number, updateImageneDto: UpdateImageneDto) {
    return `This action updates a #${id} imagene`;
  }

  async remove(id: number) {
    
    const imagen = await this.imagenRepository.findOne({where:{id}});
    if (!imagen) {
      throw new Error('Imagen no encontrada');
    }

    // Extraer el public_id de la URL de la imagen (suponiendo que la URL tiene este formato)
    const publicId = imagen.url.split('/').pop()?.split('.')[0];
    if (!publicId) {
      throw new Error('No se pudo obtener el public_id de la imagen');
    }

    try {
      // Eliminar la imagen de Cloudinary usando el public_id
      await cloudinary.uploader.destroy(publicId);
      // Eliminar la imagen de la base de datos
      await this.imagenRepository.delete(id);
      return await this.productosService.findOne(imagen.idproducto);
    } catch (error) {
      throw new Error(`Error al eliminar imagen: ${error.message}`);
    }
  }
   
}
