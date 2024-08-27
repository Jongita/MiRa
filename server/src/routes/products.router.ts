import express from 'express';
import { ProductsController } from '../controllers/products.controller';

const productsRouter=express.Router();

productsRouter.get("/", ProductsController.getAllProducts)

export {productsRouter};