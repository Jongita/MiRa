import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();
console.log("Serveris paleistas");

app.listen(process.env.PORT, ()=>{
    console.log("Express serveris paleistas ant uosto:" +process.env.PORT);
})