import Express from "express";
import productRouter from "./product";

const mainRouter = Express();
mainRouter.use('/product', productRouter);

export default mainRouter;