import bcrypt from "bcrypt";
import { pool } from "../db/connect";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class AuthController{
    static async signin(req:any, res:any){
        const name=req.body.name; 
        const surname=req.body.surname; 
        const phone=req.body.phone; 
        const email=req.body.email;
       
        let password:string=req.body.password;

        password=await bcrypt.hash(password, 12);

        let sql="SELECT * FROM users WHERE email LIKE ?";
        const [result]=await pool.query<User[]>(sql,[email]);
        if  (result.length!=0){
            return res.status(400).json({
                'text':"User with such e-mail is already registered"
            })
        }

        sql="INSERT INTO users (name, surname, phone, email, password) VALUES (?, ?, ?, ?, ?)";
        await pool.query(sql, [name, surname, phone, email, password]);

        res.json({"status":"ok"});
    }

    static async login(req:any, res:any){
        const email=req.body.email;
        const password=req.body.password;

        const sql="SELECT * FROM users WHERE email like ?";
        const [result]=await pool.query<User[]>(sql, [email])
        if (result.length!=1){
            return res.status(400).json({
                'text': 'User with this email does not exist'
            })
        }
        const user=result[0]
        let passwordOK = await bcrypt.compare(password, user.password);
        if(!passwordOK){
            return res.status(400).json({
                'text': 'Incorrect password or e-mail address entered'
            })
        }

        if (process.env.TOKEN_SECRET!=null){
            dotenv.config();
            let token=jwt.sign(
            {
            id:user.id,
            type:user.type
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '2 days'
        })

        res.json({
            // 'text': 'Viskas OK'
            'id': user.id,
            'name': user.name,
            'surname': user.surname,
            'phone': user.phone,
            'email':user.email,
            'token': token,
            'type': user.type,
            'img':user.img
        })
            
        }
    }
}