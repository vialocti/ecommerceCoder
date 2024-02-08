import { Router } from "express";
import { ProductsManager } from "../clases/ProductsManager.js";
import { CartsManager } from "../clases/CartsManager.js";
import { checkAuth, checkExistingsUser } from "../middlewares/auth.js";

const viewsRoutes=Router();


  //ir al home
  viewsRoutes.get('/', (req,res)=>{
    const user = req.session.user
   
    res.render('home', user)
  })

   //cargar productos
    viewsRoutes.get('/product',checkAuth ,(req,res)=>{
        //const {rol} = req.session.user
        
            res.render('cargarProduct')
      
        })



//ver carrito
    viewsRoutes.get('/cart/:idC',checkAuth, async(req,res)=>{
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
        

        
    })

    viewsRoutes.get('/products',checkAuth, async(req,res)=>{
        
        const {page}=req.query
        const {first_name, last_name}=req.session.user
        
        const nameuser=first_name + ' '+ last_name

        const PManager = new ProductsManager()
        try {
            const products = await PManager.getProducts(3,page)
            
            if(products){
               return res.render('products',{ products, nameuser})
            }else{
               return res.send('sin products') 
            }

        } catch (error) {
            console.log(error)
        }

    });


    //login and register

    viewsRoutes.get('/register',checkExistingsUser, (req,res)=>{
        try {
            res.render('register')
        } catch (error) {
            console.log(error)
        }
    });

    viewsRoutes.get('/login',checkExistingsUser, (req,res)=>{
        try {
            res.render('login')
        } catch (error) {
            console.log(error)
        }
    })

    //
    viewsRoutes.get('/restaurarpass',checkExistingsUser, (req,res)=>{
        try {
            res.render('restore-password')
        } catch (error) {
            console.log(error)
        }
    })







export default viewsRoutes