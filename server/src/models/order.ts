import { RowDataPacket } from "mysql2";

export interface ResultOrdersProducts extends RowDataPacket{
    productId:Number, 
    count:Number,
    name:string,
    price:Number,
}

export interface Order extends RowDataPacket{
    id?:number;
    name:string;
    email:string;
    order_date:Date;
    
    products:ResultOrdersProducts[];
}