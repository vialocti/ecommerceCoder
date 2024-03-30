export default class CartsRepository{
    constructor(dao){
        this.dao=dao
    }

    createCart=(cart)=>{
        return this.dao.saveCart(cart)
    }

    addProductInCart=(cID, pID, quantity)=>{
        return this.dao.saveProuctToCart(cID, pID, quantity)
    }

    findAllProductCart=(cID)=>{
        return this.dao.getProductsToCart(cID)
    }

    deleteAllProducsToCart=(cID)=>{
        return this.dao.deleteProductsCart(cID)
    }

    deleteOneProducToCart=(cID)=>{
        return this.dao.deleteProductToCart(cID, pID)
    }

    updateQuantityProductToCart=(cID, pID, quantity)=>{
        return this.dao.updateProductToCart(cID, pID, quantity)
    }

    updateDataCart=(cID, cart)=>{
        return this.dao.updateCart(cID, cart)
    }
} 