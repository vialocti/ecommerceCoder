import { productsModel } from "../models/products.models.js";

export class ProductsManager{ //clase de admnitracion de productos
    constructor(){};

    //buscar productos usando query params paginar limit filtros y order 
    async getProducts(limit=10, page=1, query='', sort=''){
        

        //console.log(limit, page,query,sort)
        try {
            const [code, value]=query.split(':')

            const products = await productsModel.paginate({[code]:value},{
                limit,
                page,
                sort: sort ? {price:sort} : {}
            })
            return products
        } catch (error) {
            console.log(error)
            return error
        }
    };

    //buscar producto por id

    async getProductById(idP){
        try {
            const resultado = await productsModel.findOne({_id:idP})
            return resultado
        } catch (error) {
            console.log(error)
            return error
        }
    };



    //agregar un producto 
    async addProduct(newProduct){
        
        
        try {
            const resu = await productsModel.create(newProduct)
            return resu            
        } catch (error) {
            console.log(error)
            return error
        }
    };


    //eliminar un producto de la base de datos
    async deleteProduct(idP){
        
        
        try {
            const resu = await productsModel.deleteOne({_id:idP})
            return resu
        } catch (error) {
            console.log(error)
            return error            
        }
    };


    //modificar datos de producto
    async updateProduct(idP, datosUd){
        
        try {
           const result = await productsModel.updateOne({_id:idP}, datosUd)
           return result    
        } catch (error) {
            console.log(error)
            return error
        }
    };




}