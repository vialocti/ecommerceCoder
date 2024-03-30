import { CartsManager } from "../dao/clases/CartsManager.js"
import { productService } from "../dao/repositories/services.js"




export const viewHome=(req,res)=>{
    const user = req.session.user
   
    res.render('home', user)
  }

export const viewAddProduct=(req,res)=>{
        //const {rol} = req.session.user
        
            res.render('cargarProduct')
      
        }

export const viewRegister= (req,res)=>{
    try {
        res.render('register')
    } catch (error) {
        console.log(error)
    }
}

export const viewLogin=(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

export const viewResetPassword=(req,res)=>{
    try {
        res.render('restore-password')
    } catch (error) {
        console.log(error)
    }
}



export const viewsProducts =async(req,res)=>{
        
    const {page}=req.query
    const {first_name, last_name}=req.session.user
 
    const nameuser=first_name + ' '+ last_name
   
    
    try {
        const products = await productService.getProducts(3,page)
        //console.log(products)
        if(products){
           return res.render('products',{ products, nameuser})
        }else{
           return res.send('sin products') 
        }

    } catch (error) {
        console.log(error)
    }

} 

export const viewCart=async(req,res)=>{
    const CManager = new CartsManager()
    const {idC}=req.params
    try {
        const productsCart = await CManager.getProductsCart(idC)
        let cantidad=productsCart.length
        if(productsCart){
           return res.render('cartProducts', {productsCart, cantidad})
        }else{
           return res.send('sin products in the cart') 
        }

    } catch (error) {
        console.log(error)
    }
    
 
}