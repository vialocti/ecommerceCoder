//verifica que no exista session activa y te envia al login
export const checkAuth =(req,res, next)=>{
    if(!req.session.user){
        return res.redirect('/views/login')
    }
    next()
};

//verifica que exista session 
export const checkExistingsUser=(req,res,next)=>{
    if(req.session.user){
        return res.redirect('/views/product')
    }
    next()
}