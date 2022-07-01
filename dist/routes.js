"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("./data-source");
const product_1 = require("./models/product");
const user_1 = require("./models/user");
//https://orkhan.gitbook.io/typeorm/docs/find-options
const userRouter = (0, express_1.Router)();
const userRepository = data_source_1.appDataSource.getRepository(user_1.User);
const productRepository = data_source_1.appDataSource.getRepository(product_1.Product);
userRouter.get("/", async (req, res, next) => {
    try {
        const users = await userRepository.find();
        res.send(users);
    }
    catch (error) {
        next(error);
    }
});
userRouter.post("/", async (req, res, next) => {
    try {
        const payload = req.body;
        const user = await userRepository.save({
            firstName: payload.first_name,
            lastName: payload.last_name,
            isActive: payload.is_active,
        });
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
userRouter.get("/products/:id", async (req, res, next) => {
    try {
        const result = await productRepository.find({
            where: {
                user: {
                    id: parseInt(req.params.id),
                },
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    }
});
userRouter.put("/:id", async (req, res, next) => {
    try {
        const payload = req.body;
        const result = await userRepository.update(parseInt(req.params.id), {
            isActive: payload.is_active,
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    }
});
////////////* PRODUCTS *////////////
const productsRouter = (0, express_1.Router)();
productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await productRepository.find();
        res.send(products);
    }
    catch (error) {
        next(error);
    }
});
productsRouter.post("/", async (req, res, next) => {
    try {
        const payload = req.body;
        const user = await userRepository.findOneBy({
            id: parseInt(payload.user_id),
        });
        if (!user) {
            res.send({
                message: "user not found",
            });
            return;
        }
        const product = new product_1.Product();
        product.price = payload.price;
        product.title = payload.title;
        product.user = user;
        res.send(await productRepository.save(product));
    }
    catch (error) {
        next(error);
    }
});
exports.default = [
    {
        prefix: "users",
        router: userRouter,
    },
    {
        prefix: "products",
        router: productsRouter,
    },
];
//# sourceMappingURL=routes.js.map