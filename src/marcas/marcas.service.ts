import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { MarcaDto } from './dto/payload-marca.dto';
import { GetMarcasDto } from './dto/get-marca.dto';
import { HabilitarDeshabilitar } from 'src/productos/dto/habilitarDeshabilitar.dto';


@Injectable()
export class MarcasService {

  constructor(
  @InjectRepository(Marca)
    private readonly marcaRepo: Repository<Marca>,
  ){}

  create(createMarcaDto: CreateMarcaDto) {
    return 'This action adds a new marca';
  }

  findAll() {
    return this.marcaRepo.find();
  }
  findAllHabilitado() {
    return this.marcaRepo.find({ where: { habilitado: true } });
  }


  findOne(id: number) {
    return `This action returns a #${id} marca`;
  }

  update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }
  async crearMarca(dto:MarcaDto){
    const marca:Marca = this.marcaRepo.create(<Marca>{
      nombre: dto.nombre.toUpperCase(),
      
    });

    try {
      return await this.marcaRepo.save(marca);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nombre ya existe');
      }
      throw new InternalServerErrorException('Error al crear marca');
    }
  }
    async editarMarca(id:number,dto:MarcaDto){
      const marca = await this.marcaRepo.findOne({ where: { id } });
      if (!marca) throw new NotFoundException('Marca no encontrado');
  
      Object.assign(marca, {
        nombre: dto.nombre.toUpperCase(),
      });
  
      try {
        return await this.marcaRepo.save(marca);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('El nombre ya existe');
        }
        throw new InternalServerErrorException('Error al editar marca');
      }
  
    }

    async findTabla(query: GetMarcasDto) {
      let { page = 1, pageSize = 5, search,estado } = query;
 
      const where: any = {};
    
      if (search) {
        where.nombre = Like(`%${search}%`);
      }
      if (estado) {
      switch (estado) {
        case "true":
          estado=true
          break;
        case "false":
          estado=false
          break;
        default:
          break;
      }
      where.habilitado = estado;
    }
    
      const [marcas, totalRecords] = await this.marcaRepo.findAndCount({
        where, 
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          id: 'DESC',
        },
      });

      return {
        marcas,
        totalRecords,
      };
    }

     async habilitarDeshabilitar(query:HabilitarDeshabilitar){
        const { id, habilitado } = query;
    
        const marca = await this.marcaRepo.findOne({ where: { id } });
    
        if (!marca) {
          throw new NotFoundException(`Marca con ID ${id} no encontrado`);
        }
    
        marca.habilitado = habilitado;
        return await this.marcaRepo.save(marca);
      }
}
