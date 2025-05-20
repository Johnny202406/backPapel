
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('imagenes')
export class Imagene {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idproducto: number;

  @Column()
  url: string;

  @ManyToOne(() => Producto, (producto) => producto.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idproducto' })
  producto: Producto;
}

