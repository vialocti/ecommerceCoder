import mongoose from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = mongoose.Schema(
    {
    code:String,
    purchase_datetime:{
        type:Date,
        default:timestamps
    },
    amount:Number,
    purchase:String,
    
}
    
    )

export default ticketModels=mongoose.model(ticketCollection,ticketSchema)