import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Product } from "./product";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({
        type: "text",
    })
    declare firstName: string;

    @Column({
        type: "text",
    })
    declare lastName: string;

    @Column({
        type: "text",
        nullable: true,
    })
    declare email?: string;

    @Column({
        type: "boolean",
        default: true,
    })
    declare isActive: boolean;

    @OneToMany(() => Product, (product) => product.user)
    declare products: Product[];

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;
}
