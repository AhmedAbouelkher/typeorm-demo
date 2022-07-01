"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External Packages Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
require("./data-source");
//Environment Configuration
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("trust proxy", true);
// Routes Configurations
const routes_1 = __importDefault(require("./routes"));
routes_1.default.forEach((route) => {
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
app.listen(port, async () => {
    console.info(`Gifting Server listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map