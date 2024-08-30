import express from 'express';
import { ProductsController } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const productsRouter=express.Router();

productsRouter.get("/", authMiddleware, ProductsController.getAllProducts)

export {productsRouter};