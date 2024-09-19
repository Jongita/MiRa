import { pool } from "../db/connect";
import { Product } from "../models/product";
import path from 'path';

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

    // static async filterProducts( req:any, res:any){
    //     if (req.user.type>3){
    //         return res.status(400).json({
    //             text:"Neturite teisiu"
    //         })
    //     }
    //     const sql="SELECT * FROM products WHERE name like ?";
    //     const [result]=await pool.query<Product[]>(sql, ["%"+req.params.filter+"%"]);
    //     res.json(result);
    // }

    static async insert(req: any, res: any) {
    if (isNaN(req.body.price)) {
        return res.status(400).json({
            'text': 'The price must be a number'
        });
    }

    // Handle file upload and URL construction
    const file = req.file;
    const userId = req.body.userId; 
    const fileName = req.file.filename;

    // Construct the image URL
    const imageUrl = req.protocol+"://"+req.get("host")+"/img/"+req.file.filename ;

    // Save file with new filename
    const imagePath = path.join('img', fileName);

    // SQL Query
    const sql = "INSERT INTO products (name, price, description, imageUrl, category, stock, specification) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await pool.query(sql, [req.body.name, req.body.price, req.body.description, imageUrl, req.body.category, req.body.stock, req.body.specification]);

    // Respond with success
    res.status(201).json({
        "success": true
    });
}
    static async update(req:any, res:any){
        const sql="UPDATE products SET name=?, price=?, description=?, category=?, stock=?, specification=? WHERE id=?";

        if (isNaN(req.body.price)){
            return res.status(400).json({
                'text':'The price must be a number'
            });
        }
        try{
            await pool.query(sql, [req.body.name, req.body.price, req.body.description, req.body.category, req.body.stock, req.body.id]);
        
            res.json({
                "success":true
            });
        }catch(error){
            res.status(500).json({
                'text':'An update error occurred'
            });
        }
        
    }

    static async delete(req:any, res:any){
        const sql="DELETE FROM products WHERE id=?";
        await pool.query(sql, [req.params.id]);
        res.json({
            "success":true
        })
    }


}

