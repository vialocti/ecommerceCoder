import { Router } from "express";

import { uploader } from "../config/multer.js";
;
import {
 getProducts,
  addProduct,
  getProductoById,
  updateProduct,
} from "../conrollers/products.controllers.js";

const productsRoutes = Router();

//ver productos
productsRoutes.get("/", getProducts);

//buscar productos por Id
productsRoutes.get("/:pId", getProductoById);

//adicionar productos
productsRoutes.post("/", uploader.single("file"), addProduct);

//modificar datos producto
productsRoutes.put("/:idP", updateProduct);

export default productsRoutes;
