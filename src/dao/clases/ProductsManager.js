import { productsModel } from "../models/products.models.js";

export class ProductsManager{ //clase de admnitracion de productos
    constructor(){};

    //buscar productos usando query params paginar limit filtros y order 
    async getAll(limit=10, page=1, query='', sort=''){
        

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

    async getById(pID){
        try {
            const resultado = await productsModel.findOne({_id:pID})
            return resultado
        } catch (error) {
            console.log(error)
            return error
        }
    };



    //agregar un producto 
    async saveProduct(product){
        
        
        try {
            const resu = await productsModel.create(product)
            return resu            
        } catch (error) {
            console.log(error)
            return error
        }
    };


    //eliminar un producto de la base de datos
    async delById(pID){
        
        
        try {
            const resu = await productsModel.deleteOne({_id:pID})
            return resu
        } catch (error) {
            console.log(error)
            return error            
        }
    };


    //modificar datos de producto
    async updteById(pID, product){
        
        try {
           const result = await productsModel.updateOne({_id:pID}, product)
           return result    
        } catch (error) {
            console.log(error)
            return error
        }
    };




}