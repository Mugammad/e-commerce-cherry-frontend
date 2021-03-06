import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://e-commerce-backend-cherry.herokuapp.com/products/';
class ProductService{
  async create(product) {
    return axios
      .post(API_URL, {
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        img: product.img,
        qty: product.qty,
        size: product.size,
      },
      { headers: authHeader() })
  }
  getAll() {
      return axios
        .get(API_URL)
  }
  delete(productId) {
      return axios
        .delete(API_URL + productId, { headers: authHeader() })
  }
  updateProduct(product, productID) {
    return axios
      .patch(API_URL + productID,{
        title: product.title,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice,
        description: product.description,
        img: product.img,
        qty: product.qty,
        size: product.size,
      }, 
        { headers: authHeader() })
}
};

export default new ProductService();