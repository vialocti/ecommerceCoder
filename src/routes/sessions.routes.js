import {Router}from 'express';
import { userModel } from '../models/users.models.js';
import { createHash} from '../utils/bcrypt.js';
import passport from 'passport';

const sessionsRoutes=Router()

sessionsRoutes.post('/register',passport.authenticate('register',{failureMessage:'/api/sessions/failregister'}), async(req, res)=>{
    return res.status(201).send({message:'registrado'});
});

//falla registro
sessionsRoutes.get('/failregister',(req,res)=>{
    return res.status(400).send({message:'fail to register'})
})


sessionsRoutes.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failLogin'}), async (req,res)=>{
    if(!req.user){
        return res.status(400).send({message:"error login credenciales"})
    }
    
    req.session.user={
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        email:req.user.email,
        age:req.user.age

    }
    res.redirect("http://localhost:8080/views")

});

//falla login
sessionsRoutes.get('/failLogin',(req,res)=>{
    return res.status(400).send({message:'fail to login'})
})


sessionsRoutes.post('/restorepass',async (req,res)=>{
    const {email, password} = req.body
    
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send({message:"usuario no encontrado"})
        }
        user.password=createHash(password)
        await user.save()
        return res.status(201).send({message:"password updatad"})

    } catch (error) {
        console.log(error)
    }
})
sessionsRoutes.post('/logout', async (req,res)=>{
   
    try {
        req.session.destroy(err=>{
            if(err){
                return res.send({message:"error"});
            }
            return res.redirect("http://localhost:8080/views/login")
        })     
    } catch (error) {
        
    }
});




export default sessionsRoutes