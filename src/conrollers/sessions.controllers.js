
import { userModel } from '../dao/models/users.models.js';
import { createHash} from '../config/bcrypt.js';




export const registerUser=async (req, res)=>{
    return  res.redirect("http://localhost:8080/views/login")
}





export const loginUser = async (req,res)=>{
   
    if(!req.user){
        return  res.redirect("http://localhost:8080/views/login")
        //return res.status(400).send({message:"error login credenciales"})
    }
    
    req.session.user={
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        email:req.user.email,
        age:req.user.age

    }
    res.redirect("http://localhost:8080/views")
}




export const resetPassWordUser=async (req,res)=>{
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
}




export const logoutUser=async (req,res)=>{
   
    try {
        req.session.destroy(err=>{
            if(err){
                return res.send({message:"error"});
            }
            return res.redirect("http://localhost:8080/views/login")
        })     
    } catch (error) {
        
    }
}



