export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = (limit, page, query, sort) => {
    return this.dao.getAll(limit, page, query, sort);
  };

  createProduct = (product) => {
    return this.dao.saveProduct(product);
  };

  getProductById = (pID) => {
    return this.dao.getById(pID);
  };

  deleteProductById = (pID) => {
    return this.dao.delById(pID);
  };

  updateProductById = (pID, product) => {
    return this.dao.updteById(pID, product);
  };
}
