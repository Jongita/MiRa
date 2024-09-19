import express, { Application } from 'express';
import { productsRouter } from './routes/products.router';
import { corsHeaders } from './middlewares/cors.middleware';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import path from 'path';
import { ordersRouter } from './routes/orders.router';

const app:Application=express();

app.use(express.urlencoded());

app.use(express.json());

app.use(corsHeaders);

app.use("/img", express.static(path.join("./img")));

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/orders', ordersRouter);


export {app};