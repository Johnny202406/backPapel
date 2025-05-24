import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDto } from './dto/payload-categoria.dto';
import { GetCategoriasDto } from './dto/get-categoria.dto';
import { HabilitarDeshabilitar } from 'src/productos/dto/habilitarDeshabilitar.dto';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }

  async crearCategoria(dto:CategoriaDto){
    const categoria:Categoria = this.categoriaRepo.create(<Categoria>{
      nombre: dto.nombre.toUpperCase(),
      
    });

    try {
      return await this.categoriaRepo.save(categoria);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nombre ya existe');
      }
      throw new InternalServerErrorException('Error al crear categoria');
    }
  }
  async editarCategoria(id:number,dto:CategoriaDto){
    const categoria = await this.categoriaRepo.findOne({ where: { id } });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');

    Object.assign(categoria, {
      nombre: dto.nombre.toUpperCase(),
    });

    try {
      return await this.categoriaRepo.save(categoria);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nombre ya existe');
      }
      throw new InternalServerErrorException('Error al editar categoria');
    }

  }
  
  async findTabla(query: GetCategoriasDto) {
    let { page = 1, pageSize = 5, search ,estado} = query;

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
  
    const [categorias, totalRecords] = await this.categoriaRepo.findAndCount({
      where, 
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC', 
      },
    });

    return {
      categorias,
      totalRecords,
    };
  }

  async habilitarDeshabilitar(query:HabilitarDeshabilitar){
    const { id, habilitado } = query;

    const categoria = await this.categoriaRepo.findOne({ where: { id } });

    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`);
    }

    categoria.habilitado = habilitado;
    return await this.categoriaRepo.save(categoria);
  }
}
