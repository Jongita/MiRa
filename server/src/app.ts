import express, { Application } from 'express';
import { productsRouter } from './routes/products.router';
import { corsHeaders } from './middlewares/cors.middleware';
import { authRouter } from './routes/auth.router';

const app:Application=express();

app.use(express.urlencoded());

app.use(express.json());

app.use(corsHeaders);

app.use('/products', productsRouter);
app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

export {app};