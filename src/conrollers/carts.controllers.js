import { CartsManager } from "../dao/clases/CartsManager.js"

export const addCart = async (req, res) => {
  const newC = req.body;
  const CManager = new CartsManager();
  try {
    const result = await CManager.addCart(newC);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

//ver productos de un carrito
export const getProductosToCart = async (req, res) => {
  const { idC } = req.params;
  const CManager = new CartsManager();

  try {
    const products = await CManager.getProductsCart(idC);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error al buscar productos del carrito" });
  }
};

//agregar producto a carrito
export const addProductoToCart = async (req, res) => {
  const { idC, idP } = req.params;
  const newQuantity = req.body.quantity;

  const CManager = new CartsManager();

  try {
    const result = await CManager.addProductCart(idC, idP, newQuantity);
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
  const { idC, idP } = req.params;

  const CManager = new CartsManager();
  try {
    const result = await CManager.deleteProductCart(idC, idP);
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
  const { idC } = req.params;
  const CManager = new CartsManager();
  try {
    const result = await CManager.deleteAllProductCart(idC);
    res.send({ msg: "borrados all " });
  } catch (error) {
    console.log(error);
  }
};

///actualizar productos
export const updateProducts = async (req, res) => {
  const { idC } = req.params;
  const cart = req.body;

  const CManager = new CartsManager();
  try {
    const result = await CManager.updateCart(idC, cart);

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
  const { idC, idP, quantity } = req.params;
  const CManager = new CartsManager();
  try {
    const result = await CManager.updateProductinCart(idC, idP, quantity);
    if (result) {
      res.send({ msg: "Producto Actualizado" });
    } else {
      res.status(400).send({ msg: "error al actualizar producto" });
    }
  } catch (error) {
    res.status(400).send({ msg: "error al actualizar producto" });
  }
};
