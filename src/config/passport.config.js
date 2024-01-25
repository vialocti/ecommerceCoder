import passport from "passport";
import local from 'passport-local'
import { userModel } from "../models/users.models.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const localStrategy = local.Strategy

const initializePassport=()=>{

 //register
    passport.use('register', new localStrategy(
        {passReqToCallback:true, usernameField:'email'},
        async (req, username, password,done)=>{
            const {first_name, last_name, email,age}=req.body
            try {
                const user = await userModel.findOne({email:username})
                if(user){
                    console.log('existe')
                    return done(null, false)
                }
                const newUser={
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                const result = await userModel.create(newUser)
                return done(null, result)
 

            } catch (error) {
                console.log(error)
                return done('Error: ' + error)
            }
        }

    ));

    passport.use('login',new localStrategy(
       {usernameField:'email'},
       async (username, password, done)=>{
        try {
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log('no existe user')
                return done(null, false)
            }
            if(!isValidPassword(user, password)){
                console.log('no coinciden credenciales')
                return done(null, false)
            }

            return done(null, user)

        } catch (error) {
            console.log(error)
            done(error)
        }
       }


    ));


//serializacion deserializacion

passport.serializeUser((user,done)=>{
    done(null,user._id)
});

passport.deserializeUser(async(id, done)=>{
    const user =await userModel.findOne({_id:id});
    done(null, user)
})


}

export default initializePassport

