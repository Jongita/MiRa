import { pool } from "../db/connect";
import { Order, ResultOrdersProducts } from "../models/order";
import { UserOrder } from "../models/userOrder";


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

    static async getOrdersByUserId(req: any, res: any) {
  const userId = req.params.id; // Assuming user ID is passed in the params
  const sql = `SELECT mo.id AS orderID, mo.email, mo.order_date, u.id AS userID, 
              op.product_id, op.count, p.name, p.description, p.imageUrl
              FROM mira.orders mo 
              LEFT JOIN users u ON mo.email = u.email 
              JOIN orders_products op ON mo.id = op.order_id
              JOIN products p ON op.product_id=p.id
              WHERE u.id = ?`;
              
  const [result] = await pool.query<UserOrder[]>(sql, [userId]);

  if (result.length === 0) {
    return res.status(404).json({ 'text': 'No orders found for this user' });
  } else {
    return res.json(result);
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