import Router from "express";
import {
  addCart,
  addProductoToCart,
  deleteAllProductsToCart,
  deleteProductToCart,
  getProductosToCart,
  updateProducts,
  updateQuantityProduct,
} from '../conrollers/carts.controllers.js'

const cartsRoutes = Router();

cartsRoutes.post("/", addCart);

//addicionar un producto o agregar una unidad a uno existente
cartsRoutes.post("/:idC/products/:idP/", addProductoToCart);

//ver productts carts
cartsRoutes.get("/:idC", getProductosToCart);

//eliminar producto del carrito
cartsRoutes.delete("/:idC/products/:idP", deleteProductToCart);

//eliminar todos los productos del carrito
cartsRoutes.delete("/:idC", deleteAllProductsToCart);

//actualizar productos all
cartsRoutes.put("/:idC", updateProducts);

//actualizar cantidad de ejemplares de un producto
cartsRoutes.put("/:idC/products/:idP/:quantity", updateQuantityProduct);

export default cartsRoutes;
