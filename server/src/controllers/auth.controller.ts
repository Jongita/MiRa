import bcrypt from "bcrypt";
import { pool } from "../db/connect";
import { User } from "../models/user";



export class AuthController{
       static async signin(req:any, res:any){
        let name=req.body.name;
        let surname=req.body.surname;
        let email=req.body.email;
        let phone=req.body.phone;
        let password=req.body.password;

        password=await bcrypt.hash(password, 12)

        let sql="SELECT * FROM users WHERE email LIKE ?";
        const [result]=await pool.query<User[]>(sql,[email]);
        if  (result.length!=0){
            return res.status(400).json({
                'text':"Vartotojas su tokiu el. pašto adresu yra registruotas"
            })
        }

        sql="INSERT INTO users (name, surname, email, password, phone) VALUES (?, ?, ?, ?, ?)";
        await pool.query(sql, [name, surname, email, password, phone]);
        res.json({"status": "ok"})
    }

    static async login(req:any, res:any){
        const email=req.body.email;
        const password=req.body.password;

        const sql="SELECT * FROM users WHERE email like ?";
        const [result]=await pool.query<User[]>(sql, [email])
        if (result.length!=1){
            return res.status(400).json({
                'text': 'Vartotojas su tokiu el.pastu jau neegzistuoja'
            })
        }
        const user=result[0]
        let passwordOK = await bcrypt.compare(password, user.password);
        if(!passwordOK){
            return res.status(400).json({
                'text': 'Ivestas neteisingas slaptazodis arba el.pasto adresas'
            })
        }
        res.json({
            'text': 'Viskas OK'
        })
    }
}