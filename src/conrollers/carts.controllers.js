//import { CartsManager } from "../dao/clases/CartsManager.js"
import { cartService } from "../dao/repositories/services";

export const addCart = async (req, res) => {
  const cart = req.body;
  
  try {
    const result = await cartService.createCart(cart);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

//ver productos de un carrito
export const getProductosToCart = async (req, res) => {
  const { cID } = req.params;
  

  try {
    const products = await cartService.findAllProductCart(cID);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error al buscar productos del carrito" });
  }
};

//agregar producto a carrito
export const addProductoToCart = async (req, res) => {
  const { cID, pID } = req.params;
  const quantity = req.body.quantity;

  

  try {
    const result = await cartService.addProductInCart(cID, pID, quantity);
    //console.log(result)
    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .send({ msg: "se Agrego una unidad de producto seleccionado" });
    }
    res.send({ msg: "error al Agregar un Producto" });
  } catch (error) {
    console.log(error);
  }
};

//borrar un producto

export const deleteProductToCart = async (req, res) => {
  const { cID, pID } = req.params;

  
  try {
    const result = await cartService.deleteOneProducToCart(cID, pID);
    if (result) {
      res.send({ msg: "producto eliminado" });
    } else {
      res.status(400).send({ msg: "error al eliminar" });
    }
  } catch (error) {
    console.log(error);
  }
};

//borrar todos los productos de un carrito
export const deleteAllProductsToCart = async (req, res) => {
  const { cID } = req.params;
  
  try {
    const result = await cartService.deleteAllProducsToCart(cID);
    res.send({ msg: "borrados all " });
  } catch (error) {
    console.log(error);
  }
};

///actualizar productos
export const updateProducts = async (req, res) => {
  const { cID } = req.params;
  const cart = req.body;

  
  try {
    const result = await cartService.updateDataCart(cID, cart);

    if (result) {
      res.send({ msg: "se actualizo el carrito" });
    } else {
      res.send({ msg: "no se pudo actualizar el carrito" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "no se pudo actualizar el carrito" });
  }
};

///actualizar cantidad de ejemplares

export const updateQuantityProduct = async (req, res) => {
  const { cID, pID, quantity } = req.params;
  
  try {
    const result = await cartService.updateQuantityProductToCart(cID, pID, quantity);
    if (result) {
      res.send({ msg: "Producto Actualizado" });
    } else {
      res.status(400).send({ msg: "error al actualizar producto" });
    }
  } catch (error) {
    res.status(400).send({ msg: "error al actualizar producto" });
  }
};

export const endPurchase=async(req,res)=>{
  
}
