import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { GetPedidosDto } from './dto/get-pedido.dto';


@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query() query: GetPedidosDto) {
    return this.pedidosService.findMio(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }

  @Post('upload')
  async subirPedido(@Body() createPedidoDto: CreatePedidoDto) {

    return this.pedidosService.crearPedido(createPedidoDto);
  }

  @Post('actualizar')
  async actualizarPedido(@Body() UpdatePedidoDto:UpdatePedidoDto){
    return this.pedidosService.updatePedidos(UpdatePedidoDto)
  }

}
