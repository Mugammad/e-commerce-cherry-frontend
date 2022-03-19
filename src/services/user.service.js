import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://e-commerce-backend-cherry.herokuapp.com/user';
export default {
  getUserInfo() {
    return axios.get(API_URL);
  }
}