import { pool } from "../db/connect";
import { Product } from "../models/product";


export class ProductsController{
    static async getAllProducts(req:any, res:any){
        const sql="SELECT * FROM products";
        const [result]=await pool.query<Product[]>(sql);
        res.json(result);
    }

    static async getProduct( req:any, res:any){
        console.log(req.params.id);
        const sql="SELECT * FROM products WHERE id=?";
        const [result]=await pool.query<Product[]>(sql, [req.params.id]);
        res.json(result[0]);
    }

    static async filterProducts( req:any, res:any){
        if (req.user.type>3){
            return res.status(400).json({
                text:"Neturite teisiu"
            })
        }
        const sql="SELECT * FROM products WHERE name like ?";
        const [result]=await pool.query<Product[]>(sql, ["%"+req.params.filter+"%"]);
        res.json(result);
    }


}
