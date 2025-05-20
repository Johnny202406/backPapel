import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoPedidosService } from './estado_pedidos.service';
import { CreateEstadoPedidoDto } from './dto/create-estado_pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado_pedido.dto';

@Controller('estado_pedidos')
export class EstadoPedidosController {
  constructor(private readonly estadoPedidosService: EstadoPedidosService) {}

  @Post()
  create(@Body() createEstadoPedidoDto: CreateEstadoPedidoDto) {
    return this.estadoPedidosService.create(createEstadoPedidoDto);
  }

  @Get()
  findAll() {
    return this.estadoPedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoPedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return this.estadoPedidosService.update(+id, updateEstadoPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoPedidosService.remove(+id);
  }
}
