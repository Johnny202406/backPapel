import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository,DataSource, Like } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { DetallesPedido } from 'src/detalles_pedidos/entities/detalles_pedido.entity';
import { GetPedidosDto } from './dto/get-pedido.dto';

@Injectable()
export class PedidosService {

  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Pedido)
    private pedidosRepository: Repository<Pedido>,
    @InjectRepository(DetallesPedido)
    private detallesPedidoRepository: Repository<DetallesPedido>,
    private dataSource: DataSource,
    ){}
  create(createPedidoDto: CreatePedidoDto) {
    return 'This action adds a new pedido';
  }

  async findMio(query: GetPedidosDto) {
  const { page = 1, pageSize = 5, dia, idestado, search } = query;

  // Creamos un objeto vacío y vamos agregando solo lo necesario
  const where: any = {};

  if (dia) {
    where.fecha = dia;
  }

  if (idestado !== undefined) {
    where.idestado = idestado;
  }

  if (search) {
    where.contacto = Like(`%${search}%`);
    where.dni = Like(`%${search}%`); 
  }

  const [pedidos, totalRecords] = await this.pedidosRepository.findAndCount({
    where, // ← aquí pasamos solo lo necesario
    skip: (page - 1) * pageSize,
    take: pageSize,
    relations: ['estado', 'detalles'],
  });

  pedidos.forEach(pedido => {
    pedido.fecha = new Date(pedido.fecha).toISOString().split('T')[0]; // "YYYY-MM-DD"
  });

  return {
    pedidos,
    totalRecords,
  };
}


  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
  async crearPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.dataSource.transaction(async manager => {
      // Crear y guardar el pedido base
      const pedido = manager.create(Pedido, {
        dni: createPedidoDto.dni,
        contacto: createPedidoDto.contacto,
        fecha: new Date().toISOString().slice(0, 10),
        hora: new Date().toTimeString().slice(0, 8),
        idestado: 1,
        total: 0, // se actualizará después
      });
  
      // Primero guardar el pedido para obtener un ID válido
      const pedidoGuardado = await manager.save(pedido);
  
      let total = 0;
      const detalles:DetallesPedido[] = [];
  
      for (const detalle of createPedidoDto.detalles) {
        const producto = await this.productosRepository.findOne({ where: { id: detalle.idproducto } });
  
        if (!producto) {
          throw new Error(`Producto con ID ${detalle.idproducto} no encontrado.`);
        }
  
        const subtotal = producto.precio * detalle.cantidad;
  
        const detallePedido = manager.create(DetallesPedido, {
          producto: producto,
          cantidad: detalle.cantidad,
          precio: producto.precio,
          subtotal: subtotal,
          pedido: pedidoGuardado, // ahora tiene ID
        });
  
        total += subtotal;
        detalles.push(detallePedido);
      }
  
      // Guardar todos los detalles
      await manager.save(detalles);
  
      // Actualizar el total del pedido
      pedidoGuardado.total = total;
      return await manager.save(pedidoGuardado);
    });
  }

  async updatePedidos(updatePedidoDto: UpdatePedidoDto): Promise<void> {
  const { idestado, pedidos } = updatePedidoDto;
  console.log(updatePedidoDto);
    
  if (!idestado || !Array.isArray(pedidos)) {
    throw new Error('Datos incompletos para actualizar los pedidos');
  }

  await this.pedidosRepository
    .createQueryBuilder()
    .update()
    .set({ idestado })
    .whereInIds(pedidos)
    .execute();
}

  
  
  
}
