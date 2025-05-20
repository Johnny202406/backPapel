import { Test, TestingModule } from '@nestjs/testing';
import { DetallesPedidosService } from './detalles_pedidos.service';

describe('DetallesPedidosService', () => {
  let service: DetallesPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesPedidosService],
    }).compile();

    service = module.get<DetallesPedidosService>(DetallesPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
