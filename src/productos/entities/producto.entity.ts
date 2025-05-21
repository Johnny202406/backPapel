import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Imagene } from 'src/imagenes/entities/imagene.entity';

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column('text')
  detalle: string;

  @Column({ default: true })
  habilitado: boolean;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  @JoinColumn({ name: 'idmarca' })
  marca: Marca;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idcategoria' })
  categoria: Categoria;

  @OneToMany(() => Imagene, (imagen) => imagen.producto, { cascade: true })
  imagenes: Imagene[];
}
