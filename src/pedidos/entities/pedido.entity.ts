import { DetallesPedido } from 'src/detalles_pedidos/entities/detalles_pedido.entity';
import { EstadoPedido } from 'src/estado_pedidos/entities/estado_pedido.entity';
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,OneToMany, } from 'typeorm';

  
  @Entity('pedidos')
  export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    dni: string;
  
    @Column()
    contacto: string;
  
    @Column()
    fecha: string; // formato: 'YYYY-MM-DD'
  
    @Column()
    hora: string; // formato: 'HH:mm:ss'
  
    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column()
    idestado: number;

    @ManyToOne(() => EstadoPedido)
    @JoinColumn({ name: 'idestado' })
    estado: EstadoPedido;
  
    @OneToMany(() => DetallesPedido, (detalle) => detalle.pedido, {
      cascade: true,
    })
    detalles: DetallesPedido[];
  }
  
