"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./models/product");
const user_1 = require("./models/user");
exports.appDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./database.sqlite",
    logging: true,
    synchronize: true,
    entities: [user_1.User, product_1.Product],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    subscribers: ["src/subscriber/**/*{.ts,.js}"],
});
exports.appDataSource.initialize();
//# sourceMappingURL=data-source.js.map