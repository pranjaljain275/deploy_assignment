const vaildator=(req,res,next)=>{
    console.log(req.query)
    if(req.query.role=="Admin"){
        next();
    }else {
        res.send("not allowed");
    }
}
module.exports={
    vaildator
}