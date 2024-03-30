import mongoose from "mongoose";
import { cartsModel } from "../models/carts.models.js";

export class CartsManager{

    constructor(){}
    
    //crear un nuevo carrito 
    async saveCart(cart){
        
        try {
            const resu=await cartsModel.create(cart)
            return resu   
        } catch (error) {
            console.log(error)
            return error
        }
    }

    //agregar un producto al carrito con una cantidad determinada
    //o modifico la cantidad de un producto existente

    async saveProductCart(cID, pID, quantity){
        
       
        try {
            const cart = await cartsModel.findOne({_id:cID})
            let newcarga
            newcarga = cart.products.find((elemento)=>elemento.product.toString()===pID)
            //console.log(newcarga)
            if(!newcarga){
               //producto no existente en el carrito
                cart.products.push({product:pID,quantity:quantity})
                               
            }else{
                //si el producto existe modifica cantidades
                let productsN=[]
                productsN=cart.products.filter((elemento)=>elemento.product.toString()!==pID)
                newcarga.quantity+=+quantity
                productsN.push(newcarga)
                cart.products=productsN
                
            }
            const resu= await cartsModel.updateOne({_id:cID},cart)
           
            return resu
        } catch (error) {
            console.log(error)
            return error
        }
    }


    //ver productos de un carrito

    async getProductsToCart(cID){
        
        
        try {
            const cart=await cartsModel.findOne({_id:cID}).populate('products.product')
            return cart.products
        } catch (error) {
            console.log(error)
            return error            
        }
    }

    //eliminar un producto del carrito
    
    async deleteProductToCart(cID, pID){
           
         
        try {
       
       
        const result = await cartsModel.updateOne({_id:cID},{
            $pull:{products:{product:new mongoose.Types.ObjectId(pID)}} 
            })
        if(result.modifiedCount>0){ return true}else{return false}
        } catch (error) {
            console.log(error)  
            return false  
        }
    }

    //vaciar el carrito
    async deleteProductsCart(cID){
        
        try {
            const cart = await cartsModel.findOne({_id:cID})
            cart.products=[]
            const resu = await cartsModel.updateOne({_id:cID}, cart)
            return resu 
        } catch (error) {
            console.log(error)
            return error
        }
    }
    
    //update carts all products

    async updateCart(cID, cart){
        
        try {
            const result = await cartsModel.updateOne({_id:cID}, cart) 
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
    async updateProductToCart(cID, pID, quantity){
        
        if(!quantity){
            return false
        }

        try {
            const cart = await cartsModel.findOne({_id:cID})
            if(!cart){
                return false
            }
            const product = cart.products.find(product=>product.product.toString()===pID)
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

