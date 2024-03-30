import ProductDTO from "../dao/dto/products.dto.js";
import { productService } from "../dao/repositories/services.js";

//traer todos los productos
export const getProducts = async (req, res) => {
  const { limit = 10, page = 1, query = "", sort = "" } = req.query;

  try {
    const result = await productService.getProducts(limit, page, query, sort);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error " });
  }
};

///buscar producto por Id
export const getProductoById = async (req, res) => {
  const { pID } = req.params;

  try {
    const product = await productService.getProductById(pID);

    if (!product) {
      res.send({
        status: "Ok",
        message: "NO encontrado el Producto con ese id",
      });
    } else {
      return res.send(product);
    }
  } catch (error) {
    return res.send({ error: "se ha producido un error" });
  }
};

//adicionar producto

export const addProduct = async (req, res) => {
  const product = ProductDTO(req.body);

   
  try {
    const resu = await productService.createProduct(product);
    if(resu.message='OK'){
    return res.status(201).send({ msg: "grabado Ok" });
    }else{
      res.statsu(400).send({message:resu})
    }
  } catch (error) {
    
    res.status(400).send({ message: error });
  }
};

//modificar producto

export const updateProduct = async (req, res) => {
  const { pID } = req.params;
  const product = req.body;

  try {
    const resu = await productService.updateProductById(pID, product);
    res.send({ msg: "OK Update" });
  } catch (error) {
    console.log(error);
  }
};
