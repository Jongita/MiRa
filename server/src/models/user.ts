import { RowDataPacket } from "mysql2";


export interface User extends RowDataPacket{
    id?:number;
    name:string;
    surname:string;
    email:string;
    password:string
    type?:number;
    phone:string;
   
}
