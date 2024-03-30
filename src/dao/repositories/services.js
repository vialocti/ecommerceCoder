//usaremos en el controlador

import {ProductsManager}  from "../clases/ProductsManager.js";
import { CartsManager } from "../clases/CartsManager.js";

import ProductsRepository from "./ProductsRepository.js";
import CartsRepository from "./CartsRepository.js";

//creamos una instancia de DAO 
const productDAO = new ProductsManager()
const cartDAO = new CartsManager()
//creamos y exportamos una instancia de la clase Repository
export const productService = new ProductsRepository(productDAO)
export const cartService = new CartsRepository(cartDAO)
