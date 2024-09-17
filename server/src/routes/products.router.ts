import express from 'express';
import { ProductsController } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const productsRouter=express.Router();

productsRouter.get("/", ProductsController.getAllProducts)
productsRouter.get("/:id", ProductsController.getProduct)

productsRouter.get("/filter/:filter", ProductsController.filterProducts);

export {productsRouter};