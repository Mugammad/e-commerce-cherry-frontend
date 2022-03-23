<template>
  <Navbar :userInfo="userInfo" @toggleLogin="toggleLogin" @toggleSignUp="toggleSignUp"/>
  <Navbar2/>
  <router-view @toggleLogin="toggleLogin" @toggleAddProduct="toggleAddProduct" :products="products"/>
  <ModalLogin v-if="showLoginModal" @toggleLogin="toggleLogin"/>
  <ModalSignUp v-if="showSignUpModal" @toggleLogin="toggleSignUp"/>
  <ModalAddProduct v-if="showAddProductModal" @toggleAddProduct="toggleAddProduct" @refreshProducts="refreshProducts"/>
  <Footer/>
</template>

<script>
import ProductService from './services/product.services'
// import UserService from "./services/user.service";

import Navbar from "./components/Navbar.vue"
import Navbar2 from './components/Navbar2.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalSignUp from './components/ModalSignUp.vue'
import ModalAddProduct from './components/ModalAddProduct.vue'
import ConfirmAction from './components/ConfirmAction.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    ModalLogin,
    ModalSignUp,
    ModalAddProduct,
    ConfirmAction,
    Footer
  },
  data() {
    return {
      userInfo: "",
      showLoginModal: false,
      showSignUpModal: false,
      showAddProductModal: false,
      products: '',
      loading: false
    }
  },
  methods: {
    toggleLogin(){
      this.showLoginModal = !this.showLoginModal
    },
    toggleSignUp(){
      this.showSignUpModal = !this.showSignUpModal
    },
    toggleAddProduct(){
      this.showAddProductModal = !this.showAddProductModal
    },
    refreshProducts(){
      this.loading = false;
      ProductService.getAll().then(
        (response) => {
          this.products = response.data.products
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.products =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
  created() {
    this.refreshProducts()
  },
}
</script>

<style>
:root{
  --pink: #FFE8D1;
  --brown: #826251;
  --black: black;
}
*{
  padding: 0;
  margin: 0
}
.mainSection{
  min-height: 100vh;
  margin: 0 10%;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black);
}
</style>
