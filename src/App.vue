<template>
  <Navbar class="notMobile" :userInfo="userInfo" @toggleLogin="toggleLogin" @toggleSignUp="toggleSignUp" :cartQty="cart.quantity"/>
  <Navbar2 class="notMobile"/>
  <div id="navButton" class="navBtn" @click="toggleNav">
    <svg v-if="!showNavMobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
    <svg v-if="showNavMobile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
  </div>
  <router-link @click="this.$emit('toggleNav')" class="navLink mobileCartIcon" to="/cart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/></svg><span v-if="cartQty" id="cartQty">{{cart.quantity}}</span></router-link>
  <router-view @toggleLogin="toggleLogin" @toggleAddProduct="toggleAddProduct" :products="products" :cart="cart.products" @editProduct="editProduct" @viewProduct="viewProduct" :cartQty="cart.quantity" @refreshCart="refreshCart" @confirmClearCart="confirmClearCart"/>
  <Footer/>
  <ModalLogin v-if="showLoginModal" @toggleLogin="toggleLogin" @signUpRedirect="signUpRedirect" @refreshCart="refreshCart"/>
  <ModalSignUp v-if="showSignUpModal" @toggleLogin="toggleSignUp"/>
  <ModalAddProduct v-if="showAddProductModal" @toggleAddProduct="toggleAddProduct" @refreshProducts="refreshProducts"/>
  <ModalUpdateProduct v-if="showUpdateProductModal" @toggleAddProduct="toggleUpdateProduct" @refreshProducts="refreshProducts" :product="ProductToEdit"/>
  <SingleProduct v-if="showSingleProduct" @toggleLogin="toggleLogin" @toggleViewProduct="toggleViewProduct" :product="singleProduct"/>
  <ConfirmAction id="confirmCheckout" v-if="toggleConfirmAction" :action="action" :actionSuccess="actionSuccess" @cancelAction="closeActionCheckout" @confirmAction="clearCart" :successful="actionIsSuccessful" :loading="loading"/>
  <transition name="fade3">
    <div v-if="showNavMobile" class="navMobileBg">
    </div>
  </transition>
  <transition name="slideIn" mode="in-out">
    <NavMobile v-if="showNavMobile" class="mobile" @toggleLogin="toggleLogin" @toggleSignUp="toggleSignUp" @toggleNav="toggleNav"/>
  </transition>
</template>

<script>
import ProductService from './services/product.services'
import CartService from './services/cart.services'
// import UserService from "./services/user.service";

import Navbar from "./components/Navbar.vue"
import Navbar2 from './components/Navbar2.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalSignUp from './components/ModalSignUp.vue'
import ModalAddProduct from './components/ModalAddProduct.vue'
import ModalUpdateProduct from './components/ModalUpdateProduct.vue'
import ConfirmAction from './components/ConfirmAction.vue'
import SingleProduct from './components/SingleProduct.vue'
import NavMobile from './components/NavMobile.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    ModalLogin,
    ModalSignUp,
    ModalAddProduct,
    ModalUpdateProduct,
    ConfirmAction,
    SingleProduct,
    NavMobile,
    Footer
  },
  data() {
    return {
      showLoginModal: false,
      showSignUpModal: false,
      showAddProductModal: false,
      showUpdateProductModal: false,
      showSingleProduct: false,
      toggleConfirmAction: false,
      products: '',
      cart: '',
      loading: false,
      ProductToEdit: '',
      singleProduct: '',
      action: '',
      actionSuccess: '',
      actionIsSuccessful: false,
      showNavMobile: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    editProduct(product){
      this.ProductToEdit = product
      this.showUpdateProductModal = true
      console.log(this.ProductToEdit);
    },
    toggleLogin(){
      this.showLoginModal = !this.showLoginModal
      if(this.showNavMobile){
        this.toggleNav()
      }
    },
    toggleSignUp(){
      this.showSignUpModal = !this.showSignUpModal
      if(this.showNavMobile){
        this.toggleNav()
      }
    },
    signUpRedirect(){
      this.showSignUpModal = true
      this.showLoginModal = false
    },
    toggleAddProduct(){
      this.showAddProductModal = !this.showAddProductModal
    },
    toggleUpdateProduct(){
      this.showUpdateProductModal = !this.showUpdateProductModal
    },
    toggleViewProduct(){
      this.showSingleProduct = !this.showSingleProduct
    },
    viewProduct(product){
      this.singleProduct = product
      this.showSingleProduct = !this.showSingleProduct
    },
    closeActionCheckout(){
      this.toggleConfirmAction = false
      location.reload()
    },
    confirmClearCart(action, actionSuccess){
      this.action = action
      this.actionSuccess = actionSuccess
      this.actionIsSuccessful = false
      this.toggleConfirmAction = !this.toggleConfirmAction
    },
    clearCart(){
      this.message = "";
      this.actionIsSuccessful = false
      this.loading = true;
      CartService.delete().then(
        (response) => {
          this.message = response.message;
          this.loading = false;
          const user = JSON.parse(localStorage.getItem("user"));
          user.accessToken = response.data.accessToken
          localStorage.setItem('user', JSON.stringify(user));
          this.refreshCart()
          this.actionIsSuccessful = true
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.loading = false;
        }
      );
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
    },
    refreshCart(){
      this.loading = false;
      CartService.getCart().then(
        (response) => {
          this.cart = response.data.cart
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.cart =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    toggleNav(){
      this.showNavMobile = !this.showNavMobile
      if(this.showNavMobile){
        document.getElementById('navButton').className = 'navBtnPressed';
      }else{
        document.getElementById('navButton').className = 'navBtn';
      }
    },
  },
  created() {
    this.refreshProducts()
    if(this.currentUser){
      this.refreshCart()
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
  margin: 0 10%;
}
@media screen and (max-width: 860px){
  .productsPage{
    display: flex;
    flex-direction: column;
  }
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black);
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
  opacity: 0; */
  display: none;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #8262514d;
  opacity: 0.3;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--brown);
}

.navBtn {
  position: fixed;
  width: 20px;
  height: 20px;
  top: 2rem;
  left: 10%;
  z-index: 101;
  
  animation-name: cssAnimation2;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-fill-mode: backwards;
}

.navBtnPressed {
  position: fixed;
  width: 20px;
  height: 20px;
  top: 2rem;
  z-index: 101;
}

.navBtnPressed svg {
  
  fill: var(--brown);
  position: fixed;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: -10px;
}

.navBtnPressed {
  animation-name: cssAnimation;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes cssAnimation2 {
  from {
    transform: translate(300px);
  }
  to {
    transform: translate(10%);
  }
}

@keyframes cssAnimation {
  from {
    transform: translate(10%);
    background: white;
  }
  to {
    transform: translate(300px);
    background: white;
  }
}

.navBtn svg{
  fill: var(--brown);
  position: fixed;
  width: 20px;
  height: 20px;
  left: 10%;
  padding: 0;
  margin: 0;
}
.mobileCartIcon{
  position: fixed;
  top: 2rem;
  right: 10%;
  z-index: 100;
  height: fit-content;
}

@media screen and (min-width: 860px){
  .navBtn{
    display: none;
  }
  .mobileCartIcon{
    display: none;
  }
}
</style>
