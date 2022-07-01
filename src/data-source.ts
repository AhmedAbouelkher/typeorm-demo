import { DataSource } from "typeorm";
import { Product } from "./models/product";
import { User } from "./models/user";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./database.sqlite",
    logging: true,
    synchronize: true,
    entities: [User, Product],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    subscribers: ["src/subscriber/**/*{.ts,.js}"],
});
