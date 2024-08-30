const editProductsMiddleware=(req:any, res:any, next:any)=>{
    if(req.user==null){
        return res.status(401).json({
            'text':'Vartotojas nera prisijunges'
        });
    }
    if (req.user.type==0 || req.user.type==1){
        next();
    }else{
        return res.status(401).json({
            'text':'Vartotojas neturi teisiu atlikti veiksmus'
        });
    }
}

export {editProductsMiddleware}