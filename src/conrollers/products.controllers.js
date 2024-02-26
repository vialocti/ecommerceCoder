import { ProductsManager } from "../dao/clases/ProductsManager.js";


//traer todos los productos
export const getProducts = async (req, res) => {
  const { limit = 10, page = 1, query = "", sort = "" } = req.query;

  const PManager = new ProductsManager();
  try {
    const result = await PManager.getProducts(limit, page, query, sort);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error " });
  }
};

///buscar producto por Id
export const getProductoById = async (req, res) => {
  const { pId } = req.params;
  const PManager = new ProductsManager(); //instancia de la clase

  try {
    const product = await PManager.getProductById(pId);

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
  const newP = req.body;
  const PManager = new ProductsManager();

  let path = "";
  if (req.file) {
    path = req.file.path.split("public").join("");
  } else {
    path = "sin imagen";
  }
  //console.log(path)

  if (
    !newP.title ||
    !newP.description ||
    !newP.code ||
    !newP.price ||
    !newP.stock
  ) {
    return res.send({ message: "datos incompletos" });
  }
  //console.log(newP)
  //return
  try {
    const resu = await PManager.addProduct({ ...newP, thumbnails: path });
    //console.log(resu)
    res.status(201).send({ msg: "grabado Ok" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error grabacion" });
  }
};

//modificar producto

export const updateProduct = async (req, res) => {
  const { idP } = req.params;
  const datosUd = req.body;
  const PManager = new ProductsManager();
  try {
    const resu = await PManager.updateProduct(idP, datosUd);
    res.send({ msg: "OK Update" });
  } catch (error) {
    console.log(error);
  }
};
