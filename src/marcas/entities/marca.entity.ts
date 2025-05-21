import { Producto } from 'src/productos/entities/producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  
  @Column({ default: true })
  habilitado: boolean;


  @OneToMany(() => Producto, (producto) => producto.marca)
  productos: Producto[];
}

