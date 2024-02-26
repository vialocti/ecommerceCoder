import passport from "passport";
import local from 'passport-local'
import { userModel } from "../dao/models/users.models.js"; 
import { createHash, isValidPassword } from "./bcrypt.js";
//import { Strategy as GitHubStrategy } from "passport-github2";

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
            return done(error)
        }
       }


    ));

    
     //gitHub login
     /*
     passport.use('github', new GitHubStrategy({
        clientID:'Iv1.4a7e8a53b9669182',
        callbackURL:'http://localhost:8080/api/sessions/githubacallback',
        clientSecret:'eab972c4c8a94dc30ea1d87c29cf9010b372dde0'
    },
    async (accessToken, refreshToken, profile, done)=>{
        try {
            //console.log(profile);
            const user = await userModel.findOne({email:profile._json.email});
            if(!user){
                const newUser ={
                    first_name:profile._json.name.split(' ')[0],
                    last_name:profile._json.name.split(' ')[1],
                    age:42,
                    email:profile._json.email,
                    password:createHash('gitGenerated')
                }
                const result = await userModel.create(newUser);
                return done(null, result)
            }
            return done(null, user)

        } catch (error) {
            console.log(error)
        }
    }
    ));
*/

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

