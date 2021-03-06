import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://e-commerce-backend-cherry.herokuapp.com/cart/';
class ProductService{
  async addToCart(productId, qty) {
    return axios
      .post(API_URL + productId, {
          qty,
      },
      { headers: authHeader() })
  }
  getCart() {
      return axios
        .get(API_URL, { headers: authHeader() })
  }
  delete() {
      return axios
        .delete(API_URL, { headers: authHeader() })
  }
  removeCartItem(productID) {
    return axios
      .patch(API_URL + productID,{}, 
        { headers: authHeader() })
}
updateQuantity(productID, quantity) {
    return axios
      .put(API_URL + productID, {qty: parseInt(quantity)}, 
        { headers: authHeader() })
}
};

export default new ProductService();