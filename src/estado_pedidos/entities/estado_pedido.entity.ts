import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('estado_pedidos')
export class EstadoPedido {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Pedido, (pedido) => pedido.estado)
    pedidos: Pedido[];
}
