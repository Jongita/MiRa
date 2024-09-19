import { pool } from "../db/connect";
import { Order, ResultOrdersProducts } from "../models/order";


export class OrderController{
     static async getAll( req:any, res:any){
       
        const sql="SELECT * FROM orders";
        const [result]=await pool.query<Order[]>(sql);

        for (let i=0; i<result.length; i++){
            // paprastesnis budas
            // const sql2="SELECT product_id as productId, count FROM orders_products WHERE order_id=?";
            // geresnis budas
            const sql2="SELECT op.product_id as productId, op.count, p.name, p.price FROM orders_products op LEFT JOIN products p ON op.product_id=p.id WHERE order_id=?";   
            const [products]=await pool.query<ResultOrdersProducts[]>(sql2, [result[i].id]);
            result[i].products=products;
            console.log(products);
       };
        console.log(result);
        res.json(result);
    }

    static async getOrder( req:any, res:any){
    
        const sql="SELECT * FROM orders WHERE id=?";
        const [result]=await pool.query<Order[]>(sql, [req.params.id]);
        if (result.length==0){
            res.status(404).json({
                'text': 'Pateiktas irasas nerastas'
            })
        } else{
            res.json(result[0]);
        }
       
    }

      static async insert(req:any, res:any){
        const order:Order=req.body;

        const sql="INSERT INTO orders (name, email) VALUES ( ?, ? )";
        const [result, fields]=await pool.query(sql, [order.name, order.email]);
        const insertId=(result as any).insertId;

        order.products.forEach(async (product)=>{
            const sql2="INSERT INTO orders_products (order_id, product_id, count) VALUES (?, ?, ?)";
            await pool.query(sql2, [insertId, product.productId, product.count] );
        });
        
        res.status(201).json({
            "success":true
        })
    }

     static async delete(req:any, res:any){
        let sql="DELETE FROM orders_products WHERE order_id=?";
        await pool.query(sql, [req.params.id]);

        sql="DELETE FROM orders WHERE id=?";
        await pool.query(sql, [req.params.id]);
        res.json({
            "success":true
        })
    }
}