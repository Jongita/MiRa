import path from "path";
import { pool } from "../db/connect";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import  fs from 'fs';

export class UserController{
    static async getAll(req:any, res:any){
        const [result]=await pool.query<User[]>("SELECT * FROM users");
        return res.json(result);
       

    }
    static async getUser(req:any, res:any){
        //Redaguojamo vartotojo ID
        const userId=req.params.id;

        //req.user.id  -- prisijungusio vartotojo id
        //req.user.type -- prisijungusio vartotojo tipas

        if ( !(req.user.type==0 || userId==req.user.id)){
            res.status(400).json({
                text:"Jūs neturite teisės redaguoti įrašą"
            })
        }
        
        const [result]=await pool.query<User[]>("SELECT * FROM users WHERE id=?",[userId]);
        if (result.length==0){
            res.status(404).json({
                text:"Vartotojas nerastas"
            });
        }else{
            res.json(result[0]);
            console.log(result[0]);
        }
    }

    static async updateUserRecord(id:any, email:any, name:any, password:any, type:any, fileURL:any){
        if (password!=''){
            const passwordHash=await bcrypt.hash(password, 12);
            

            await pool.query("UPDATE users SET email=?, name=?, password=? WHERE id=? ",[
                email,
                name,
                passwordHash,
                id
            ]);
        }else{
            await pool.query("UPDATE users SET email=?, name=? WHERE id=? ",[
                email,
                name,
                id
            ]);
        }

        if (type!=null){
            await pool.query("UPDATE users SET type=? WHERE id=? ",[
                type,
                id
            ]);
        }

        if (fileURL!=null){
            // pasiimti is duomenu bazes buvusi pavadinima
            const [oldUser]=await pool.query<User[]>("SELECT * FROM users WHERE id=?", [id]);
           
            // istrinsim pries tai buvusi faila
            fs.unlinkSync(path.join('./img/'+oldUser[0].img.split('/').pop()))
            await pool.query("UPDATE users SET img=? WHERE id=? ",[
                fileURL,
                id
            ]);
        }
    }

    static async update(req:any, res:any){
        //Redaguojamo vartotojo ID
        const userId=req.params.id;

        //req.user.id  -- prisijungusio vartotojo id
        //req.user.type -- prisijungusio vartotojo tipas

        if ( !(req.user.type==0 || userId==req.user.id)){
            res.status(400).json({
                text:"Jūs neturite teisės redaguoti įrašą"
            })
        }

        // if (req.body.password!=''){
        //     const passwordHash=await bcrypt.hash(req.body.password, 12);

        //     await pool.query("UPDATE users SET email=?, name=?, password=?, type=? WHERE id=? ",[
        //         req.body.email,
        //         req.body.name,
        //         passwordHash,
        //         req.body.type,
        //         userId
        //     ]);
        // }else{
        //     await pool.query("UPDATE users SET email=?, name=?, type=? WHERE id=? ",[
        //         req.body.email,
        //         req.body.name,
        //         req.body.type,
        //         userId
        //     ]);
        // }

        await UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.password, req.body.type, null );

        res.json({
            success:true
        });

    }

    static async delete(req:any, res:any){
        await pool.query("DELETE FROM users WHERE id=?",[req.params.id]);
        res.json({
            success:true
        });
    }

    static async updateProfile(req:any, res:any){
        const userId=req.params.id;


        console.log("Vartotojo profilis atnaujintas")
        console.log(req.body);

         let url = null; // Default to null if no file is uploaded
    if (req.file) {
        // Only generate the URL if a file is uploaded
        url = req.protocol + "://" + req.get("host") + "/img/" + req.file.filename;
    }

    // Pass the file URL (or null) to the updateUserRecord function
    await UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.password, null, url);

    res.json({
        success: true
    });


        // http(req.protocol) + localhost +img + filename
        // const url=req.protocol+"://"+req.get("host")+"/img/"+req.file.filename ;

        // UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.password, null, url );
        // res.json({
        //     success:true
        // });
    }
}