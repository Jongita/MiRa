import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { OrderController } from '../controllers/order.controller';


const ordersRouter=express.Router();

ordersRouter.get('/', authMiddleware, OrderController.getAll)
ordersRouter.get('/:id', authMiddleware, OrderController.getOrder)
ordersRouter.get('/user/:id', authMiddleware, OrderController.getOrdersByUserId);
ordersRouter.post('/', authMiddleware, OrderController.insert)
ordersRouter.delete('/:id', authMiddleware, OrderController.delete)

export {ordersRouter};