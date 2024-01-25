import mongoose from "mongoose";

const userCollection='users';

const userSchema=mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
        },
    rol:{
        type:String,
        required:true,
        default:'usuario'
    }

});

export const userModel=mongoose.model(userCollection,userSchema)