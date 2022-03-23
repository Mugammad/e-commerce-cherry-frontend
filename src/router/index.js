import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Account from '../views/Account.vue'
import Products from '../views/Products.vue'
import Bottoms from '../views/Bottoms.vue'
import Dresses from '../views/Dresses.vue'
import Headwear from '../views/Headwear.vue'
import Admin from '../views/AdminBoard.vue'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/bottoms',
    name: 'Bottoms',
    component: Bottoms
  },
  {
    path: '/dresses',
    name: 'Dresses',
    component: Dresses
  },
  {
    path: '/headwear',
    name: 'Headwear',
    component: Headwear
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
