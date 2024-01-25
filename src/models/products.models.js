import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection ='products'

const productsSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
   },
   description:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true,
    unique:true
   },
   price:{
    type:Number,
    required:true
   },
   stock:{
    type:Number,
    required:true
   },
   category:{
    type:String,
    enum:['MALBEC','CABERNET','BONARDA','SYRAH','MERLOT'],
    required:true
   },
   thumbnails:{
    type:String,
    
   },
   status:{
    type:Boolean,
    default:true
   }



})
productsSchema.plugin(mongoosePaginate)


export const productsModel = mongoose.model(productsCollection,productsSchema)
