import { Router } from "express";
import { appDataSource } from "./data-source";
import { Product } from "./models/product";
import { User } from "./models/user";

//https://orkhan.gitbook.io/typeorm/docs/find-options

const userRouter = Router();

const userRepository = appDataSource.getRepository(User);
const productRepository = appDataSource.getRepository(Product);

userRouter.get("/", async (req, res, next) => {
    try {
        const users = await userRepository.find();
        res.send(users);
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
        next(error);
    }
});

////////////* PRODUCTS *////////////

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await productRepository.find();
        res.send(products);
    } catch (error) {
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

        const product = new Product();
        product.price = payload.price;
        product.title = payload.title;
        product.user = user;

        res.send(await productRepository.save(product));
    } catch (error) {
        next(error);
    }
});

////////////* Routers *////////////

interface IRouter {
    prefix: string;
    router: Router;
}

export default <IRouter[]>[
    {
        prefix: "users",
        router: userRouter,
    },
    {
        prefix: "products",
        router: productsRouter,
    },
];
