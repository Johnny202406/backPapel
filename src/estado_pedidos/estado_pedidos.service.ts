import { Injectable } from '@nestjs/common';
import { CreateEstadoPedidoDto } from './dto/create-estado_pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado_pedido.dto';
import { Repository } from 'typeorm';
import { EstadoPedido } from './entities/estado_pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadoPedidosService {
  constructor(
    @InjectRepository(EstadoPedido)
        private readonly EstadoPedidoRepo: Repository<EstadoPedido>,
  ){}
  create(createEstadoPedidoDto: CreateEstadoPedidoDto) {
    return 'This action adds a new estadoPedido';
  }

  findAll() : Promise<EstadoPedido[]>{
    return this.EstadoPedidoRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoPedido`;
  }

  update(id: number, updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return `This action updates a #${id} estadoPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoPedido`;
  }
}
