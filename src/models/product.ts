import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({
        type: "text",
    })
    declare title: string;

    @Column({
        type: "float",
    })
    declare price: number;

    @ManyToOne(() => User, (user) => user.products, {
        onDelete: "CASCADE",
    })
    declare user: User;

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;
}
