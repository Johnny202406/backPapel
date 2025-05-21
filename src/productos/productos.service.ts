import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Imagene } from 'src/imagenes/entities/imagene.entity';
import { ProductoDto } from './dto/payload-producto.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Marca)
    private marcaRepository: Repository<Marca>,
    @InjectRepository(Imagene)
    private imageneRepository: Repository<Imagene>,
  ) {}

  // Método para obtener productos con paginación y filtros
  async getProductos(
    page: number = 1,
    pageSize: number = 5,
    search: string,
    categoryId?: number,
    brandId?: number
  ) {
    const queryBuilder = this.productosRepository.createQueryBuilder('p');
  
    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      queryBuilder.andWhere(
        '(p.nombre LIKE :search OR p.codigo LIKE :search)',
        { search: `%${searchTerm}%` }
      );
    }
  
    if (categoryId !== undefined && categoryId !== null) {
      queryBuilder.andWhere('p.categoria = :categoryId', { categoryId });
    }
  
    if (brandId !== undefined && brandId !== null) {
      queryBuilder.andWhere('p.marca = :brandId', { brandId });
    }
  
    // ✅ CLONA el QueryBuilder para contar
    const totalRecords = await queryBuilder.getCount();
  
    // ✅ Luego aplicas paginación
    const productos = await queryBuilder
      .leftJoinAndSelect('p.categoria', 'categoria')
      .leftJoinAndSelect('p.marca', 'marca')
      .leftJoinAndSelect('p.imagenes', 'imagenes')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  
    return {
      productos,
      totalRecords
    };
  }
  
  

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all productos`;
  }

  async findOne(param: number) {
    const queryBuilder = this.productosRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria', 'categoria')
      .leftJoinAndSelect('p.marca', 'marca')
      .leftJoinAndSelect('p.imagenes', 'imagenes');
  
      queryBuilder.where('p.id = :id', { id: param })  
    
  
    return await queryBuilder.getOne();  
  }
  // async findOnePorNombreoCodigo(param: string) {
  //   const queryBuilder = this.productosRepository
  //     .createQueryBuilder('p')
  //     .leftJoinAndSelect('p.categoria', 'categoria')
  //     .leftJoinAndSelect('p.marca', 'marca')
  //     .leftJoinAndSelect('p.imagenes', 'imagenes');
  
  //     queryBuilder 
  //     .where('p.nombre = :param', { param })
  //     .orWhere('p.codigo = :param', { param });
    
  
  //   return await queryBuilder.getOne();  
  // }
  // async findOnePorNombreoCodigo(param: string) {
  //   const queryBuilder = this.productosRepository
  //     .createQueryBuilder('p')
  //     .leftJoinAndSelect('p.categoria', 'categoria')
  //     .leftJoinAndSelect('p.marca', 'marca')
  //     .leftJoinAndSelect('p.imagenes', 'imagenes');

  //   queryBuilder
  //     .where('(p.nombre = :param OR p.codigo = :param)', { param })
  //     .andWhere('p.habilitado = :habilitado', { habilitado: true });

  //   return await queryBuilder.getOne();
  // }
  async findOnePorNombreoCodigo(param: string) {
  return await this.productosRepository.findOne({
    where: [
      { nombre: param, habilitado: true },
      { codigo: param, habilitado: true },
    ],
    relations: ['categoria', 'marca', 'imagenes'],
  });
}


  

  async findLast(length:number){
    const productos = await this.productosRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria', 'categoria')
      .leftJoinAndSelect('p.marca', 'marca')
      .leftJoinAndSelect('p.imagenes', 'imagenes')
      .orderBy('p.id', 'DESC')
      .take(length)
      .getMany();

    return productos;
  }


  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

  async getProductosCliente( 
    page: number, 
    pageSize: number, 
    search?: string, 
    categoria?: string, 
    marcas?: string[], 
    minPrice?: number, 
    maxPrice?: number, 
    onlyStock?: boolean, 
    sort?: string, 
    length?: number, 
    productoRefer?: string 
  ) { 
    const baseQuery = this.productosRepository
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.categoria', 'categoria')
    .leftJoinAndSelect('p.marca', 'marca')
    .leftJoinAndSelect('p.imagenes', 'imagenes')
    .orderBy('p.id', 'DESC');

  let baseProductos: Producto[] = [];

  // 1. Determinar el conjunto base
  if (productoRefer) {
    const refProduct = await this.productosRepository.findOne({
      where: [{ nombre: productoRefer }, { codigo: productoRefer }],
      relations: ['marca', 'categoria'],
    });
    if (refProduct) {
      categoria = refProduct.categoria.nombre;
      marcas = [refProduct.marca.nombre];
      baseProductos = await this.productosRepository.find({
        where: {
          categoria: { id: refProduct.categoria.id },
          marca: { id: refProduct.marca.id },
        },
        relations: ['marca', 'categoria', 'imagenes'],
      });
    }
  } else if (search) {
    baseProductos = await this.productosRepository.find({
      where: [
        { nombre: Like(`%${search}%`) },
        { codigo: Like(`%${search}%`) },
      ],
      relations: ['marca', 'categoria', 'imagenes'],
    });
  } else if (categoria) {
    baseProductos = await this.productosRepository.find({
      where: { categoria: { nombre: categoria } },
      relations: ['marca', 'categoria', 'imagenes'],
    });
  } else if (length) {
    baseProductos = await baseQuery.take(length).getMany();
  } else {
    baseProductos = await baseQuery.getMany();
  }

  // 2. Obtener marcas desde ese conjunto base
  const marcasResult = this.getMarcasFromProductos(baseProductos);

  // 3. Aplicar los filtros adicionales a los productos
  let productos = [...baseProductos];
  if (marcas?.length) {
    productos = productos.filter((p) => marcas.includes(p.marca?.nombre));
  }
  if (minPrice !== undefined) {
    productos = productos.filter((p) => p.precio >= +minPrice);
  }
  if (maxPrice !== undefined) {
    productos = productos.filter((p) => p.precio <= +maxPrice);
  }
  if (onlyStock) {
    productos = productos.filter((p) => p.stock > 0);
  }
  // 4. Lógica de ordenamiento
  switch (sort) {
    case 'name-asc':
      productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case 'name-desc':
      productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    case 'price-asc':
      productos.sort((a, b) => a.precio - b.precio);
      break;
    case 'price-desc':
      productos.sort((a, b) => b.precio - a.precio);
      break;
    case 'date-asc':
      productos.sort((a, b) => a.id - b.id);
      break;
    case 'date-desc':
      productos.sort((a, b) => b.id - a.id);
      break;
    default:
      // Si no se pasa un valor de 'sort', no se ordena
      break;
  }
  const totalCount = productos.length;
  productos = productos.slice((page - 1) * pageSize, page * pageSize);

  return {
    productos,
    totalRecords: totalCount,
    marcas: marcasResult,
  };

  }
   getMarcasFromProductos(productos: Producto[]): { marca: string; cantidad: number }[] {
    const marcaMap = new Map<string, number>();
    for (const p of productos) {
      const nombreMarca = p.marca?.nombre;
      if (nombreMarca) {
        marcaMap.set(nombreMarca, (marcaMap.get(nombreMarca) || 0) + 1);
      }
    }
    return Array.from(marcaMap.entries())
      .map(([marca, cantidad]) => ({ marca, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }

  async crearProducto(dto:ProductoDto){
    const producto:Producto = this.productosRepository.create(<Producto>{
      codigo: dto.codigo.toUpperCase(),
      nombre: dto.nombre.toUpperCase(),
      precio: dto.precio,
      stock: Math.trunc(<number>dto.stock) ?? 0,
      detalle: dto.detalle?.toUpperCase() ?? '',
      marca: dto.marcaId ? { id: dto.marcaId } : null,
      categoria: dto.categoriaId ? { id: dto.categoriaId } : null,
    });

    try {
      return await this.productosRepository.save(producto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El código o nombre ya existe');
      }
      throw new InternalServerErrorException('Error al crear producto');
    }
  }
  async editarProducto(id:number,dto:ProductoDto){
    const producto = await this.productosRepository.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    Object.assign(producto, {
      codigo: dto.codigo.toUpperCase(),
      nombre: dto.nombre.toUpperCase(),
      precio: dto.precio,
      stock: Math.trunc(<number>dto.stock) ?? 0,
      detalle: dto.detalle?.toUpperCase() ?? '',
      marca: dto.marcaId ? { id: dto.marcaId } : null,
      categoria: dto.categoriaId ? { id: dto.categoriaId } : null,
    });

    try {
      return await this.productosRepository.save(producto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El código o nombre ya existe');
      }
      throw new InternalServerErrorException('Error al editar producto');
    }

  }
  
  
  
  
  
  
  
  
  
}

