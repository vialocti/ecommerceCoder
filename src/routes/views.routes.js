import { Router } from "express";

import { checkAuth, checkExistingsUser } from "../middlewares/auth.js";
import {
  viewAddProduct,
  viewCart,
  viewHome,
  viewLogin,
  viewRegister,
  viewResetPassword,
  viewsProducts,
} from "../conrollers/views.conntrollers.js";

const viewsRoutes = Router();

//ir al home
viewsRoutes.get("/", viewHome);

//cargar productos
viewsRoutes.get("/product", checkAuth, viewAddProduct);

//ver carrito
viewsRoutes.get("/cart/:idC", checkAuth, viewCart);

viewsRoutes.get("/products", checkAuth, viewsProducts);

//login and register

viewsRoutes.get("/register", checkExistingsUser, viewRegister);

viewsRoutes.get("/login", checkExistingsUser, viewLogin);

//reset
viewsRoutes.get("/restaurarpass", checkExistingsUser, viewResetPassword);

export default viewsRoutes;
