<template>
  <Navbar :userInfo="userInfo" @toggleLogin="toggleLogin" @toggleSignUp="toggleSignUp"/>
  <Navbar2/>
  <ModalLogin v-if="showLoginModal" @toggleLogin="toggleLogin"/>
  <ModalSignUp v-if="showSignUpModal" @toggleLogin="toggleSignUp"/>
  <ModalAddProduct v-if="showAddProductModal" @toggleAddProduct="toggleAddProduct"/>
  <router-view @toggleLogin="toggleLogin" @toggleAddProduct="toggleAddProduct"/>
  <Footer/>
</template>

<script>
// import UserService from "./services/user.service";

import Navbar from "./components/Navbar.vue"
import Navbar2 from './components/Navbar2.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalSignUp from './components/ModalSignUp.vue'
import ModalAddProduct from './components/ModalAddProduct.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    ModalLogin,
    ModalSignUp,
    ModalAddProduct,
    Footer
  },
  data() {
    return {
      userInfo: "",
      showLoginModal: false,
      showSignUpModal: false,
      showAddProductModal: false
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
    }
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
}
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black);
}
</style>
