import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('detalles_pedidos')
export class DetallesPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto,{ eager: true })
  @JoinColumn({ name: 'idproducto' })
  producto: Producto;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  @JoinColumn({ name: 'idpedido' })
  pedido: Pedido;
}

