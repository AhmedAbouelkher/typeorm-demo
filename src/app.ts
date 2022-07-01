// External Packages Imports
import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import "./data-source";

//Environment Configuration
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

// Routes Configurations
import routes from "./routes";
import { appDataSource } from "./data-source";

routes.forEach((route) => {
    app.use(`/${route.prefix}`, route.router);
});

app.all("*", (req, res) => {
    res.status(404).send({
        status_code: 404,
        message: "requested route does not exist",
        details: {
            method: req.method,
            requested_route: req.url,
        },
    });
});

// Server initialization
const port = process.env.PORT ?? 3000;

appDataSource.initialize().then(() => {
    app.listen(port, async () => {
        console.info(`Server listening at http://localhost:${port}`);
    });
});
