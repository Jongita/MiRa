
const corsHeaders=(req:any,res:any, next:any)=>{
    console.log("CORS");

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept, Auth");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
}

export { corsHeaders };