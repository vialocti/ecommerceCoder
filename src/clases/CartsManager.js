import mongoose from "mongoose";
import { cartsModel } from "../models/carts.models.js";

export class CartsManager{

    constructor(){}
    
    //crear un nuevo carrito 
    async addCart(newC){
        
        try {
            const resu=await cartsModel.create(newC)
            return resu   
        } catch (error) {
            console.log(error)
            return error
        }
    }

    //agregar un producto al carrito con una cantidad determinada
    //o modifico la cantidad de un producto existente

    async addProductCart(idC, idP, newQuantity){
        
       
        try {
            const cart = await cartsModel.findOne({_id:idC})
            let newcarga
            newcarga = cart.products.find((elemento)=>elemento.product.toString()===idP)
            //console.log(newcarga)
            if(!newcarga){
               //producto no existente en el carrito
                cart.products.push({product:idP,quantity:newQuantity})
                               
            }else{
                //si el producto existe modifica cantidades
                let productsN=[]
                productsN=cart.products.filter((elemento)=>elemento.product.toString()!==idP)
                newcarga.quantity+=+newQuantity
                productsN.push(newcarga)
                cart.products=productsN
                
            }
            const resu= await cartsModel.updateOne({_id:idC},cart)
           
            return resu
        } catch (error) {
            console.log(error)
            return error
        }
    }


    //ver productos de un carrito

    async getProductsCart(idC){
        
        
        try {
            const cart=await cartsModel.findOne({_id:idC}).populate('products.product')
            return cart.products
        } catch (error) {
            console.log(error)
            return error            
        }
    }

    //eliminar un producto del carrito
    
    async deleteProductCart(idC, idP){
           
         //console.log(idC)
        try {
       
        /* a lo gaucho
        const cart = await cartsModel.findOne({_id:idC})
        
        let productsNew = cart.products.filter((item)=>item.product.toString()!==idP)
        cart.products = productsNew
        const resu = await cartsModel.updateOne({_id:idC},cart)
        */
        
        //elegante
        const result = await cartsModel.updateOne({_id:idC},{
            $pull:{products:{product:new mongoose.Types.ObjectId(idP)}} 
            })
        if(result.modifiedCount>0){ return true}else{return false}
        } catch (error) {
            console.log(error)  
            return false  
        }
    }

    //vaciar el carrito
    async deleteAllProductCart(idC){
        
        try {
            const cart = await cartsModel.findOne({_id:idC})
            cart.products=[]
            const resu = await cartsModel.updateOne({_id:idC}, cart)
            return resu 
        } catch (error) {
            console.log(error)
            return error
        }
    }
    
    //update carts all products

    async updateCart(idC, cart){
        
        try {
            const result = await cartsModel.updateOne({_id:idC}, cart) 
            if(result.modifiedCount > 0){
                return true
            }else{
                return false
            }

        } catch (error) {
            console.log(error)
            return false
        }

    }

    //update de un producto
    async updateProductinCart(idC, idP, quantity){
        
        if(!quantity){
            return false
        }

        try {
            const cart = await cartsModel.findOne({_id:idC})
            if(!cart){
                return false
            }
            const product = cart.products.find(product=>product.product.toString()===idP)
            if(!product){
                return false
            }
            product.quantity=quantity
            await cart.save()
            return true 
        } catch (error) {
            console.log(error)
            return false
        }
    }

}