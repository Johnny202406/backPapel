import { Test, TestingModule } from '@nestjs/testing';
import { DetallesPedidosController } from './detalles_pedidos.controller';
import { DetallesPedidosService } from './detalles_pedidos.service';

describe('DetallesPedidosController', () => {
  let controller: DetallesPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesPedidosController],
      providers: [DetallesPedidosService],
    }).compile();

    controller = module.get<DetallesPedidosController>(DetallesPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
