import express from 'express';
import { ProductsController } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const productsRouter=express.Router();

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        // Ensure the file name format is p_<userId>_<timestamp>.jpg
        const userId = req.body.userId; // Ensure userId is provided
        const fileName = "p_"+Date.now()+".jpg";
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

productsRouter.get("/", ProductsController.getAllProducts)
productsRouter.get("/:id", ProductsController.getProduct)
productsRouter.post("/", upload.single('image'), ProductsController.insert);
productsRouter.put("/",authMiddleware, ProductsController.update);
productsRouter.delete("/:id",authMiddleware, ProductsController.delete);

export {productsRouter};

