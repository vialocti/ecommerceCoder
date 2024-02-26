import {Router}from 'express';
import passport from 'passport';
import { loginUser, logoutUser, registerUser, resetPassWordUser } from '../conrollers/sessions.controllers.js';

const sessionsRoutes=Router()

sessionsRoutes.post('/register',passport.authenticate('register',{failureMessage:'/api/sessions/failregister'}),registerUser)
sessionsRoutes.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failLogin'}),loginUser);
sessionsRoutes.post('/restorepass',resetPassWordUser)
sessionsRoutes.post('/logout',logoutUser );

//falla registro
sessionsRoutes.get('/failregister',(req,res)=>{
    return res.status(400).send({message:'fail to register'})
})
//falla login
sessionsRoutes.get('/failLogin',(req,res)=>{
    return  res.redirect("http://localhost:8080/views/login")
})

sessionsRoutes.get('/github', passport.authenticate('github',{scope:["user:email"]}),
(req,res)=>{

});

sessionsRoutes.get('/githubacallback', passport.authenticate('github', {failureRedirect:'/login'}),
(req, res)=>{
    req.session.user=req.user
    res.redirect('/views')
})






export default sessionsRoutes