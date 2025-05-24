import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('administradores')
export class Administrador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  username: string;

  @Column()
  contrasena: string;

  @Column()
  habilitado: boolean;
}

