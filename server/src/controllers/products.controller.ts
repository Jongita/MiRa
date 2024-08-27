import { pool } from "../db/connect";
import { Product } from "../models/product";


export class ProductsController{
    static async getAllProducts(req:any, res:any){
        const sql="SELECT * FROM products";
        const [result]=await pool.query<Product[]>(sql);
        res.json(result);
    }
}
