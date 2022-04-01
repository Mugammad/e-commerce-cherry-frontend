<template>
  <div class="mainSection" id="cartSection">
    <div class="cart">
      <div class="productsHeader">
        <div class="headerStart">
          <p> Shopping Cart</p>
        </div>
        <div class="headerEnd">

        </div>
      </div>
      <CartCard v-for="item in cart" :key="item.id" :cartItem="item" @removeProduct="removeProduct" @updateQty="updateQty"/>
      <div v-if="cart">
        <div v-if="!cart[0]" class="emptyMessage"><h1>Your cart is empty :(</h1></div>
      </div>
      <div v-if="loading" class="loaderCart">
          <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
      </div>
    </div>
    <div class="checkout">
      <div class="productsHeader checkoutHeader">
          <span class="checkoutRow"><p>{{ cartQty }} items</p><span>R {{ totalPrice }}</span></span>
          <span class="checkoutRow"><p>Shipping</p><span>N/A</span></span>
      </div>
      <div class="productsHeader checkoutHeader">
          <span class="checkoutRow total"><p><b>Total:</b></p><span>R {{ totalPrice }}</span></span>
      </div>
      <button @click="confirmClearCart" id="addProductBtn" :disabled="cartEmpty">
        <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
        <span v-show="!loading">Checkout</span>
      </button>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import CartService from '../services/cart.services'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  data() {
    return {
      totalPrice: 0,
      loading: false,
      message: '',
      cartEmpty: false
    }
  },
  props: [
    'cart',
    'cartQty'
  ],
  components: {
    CartCard,
    PulseLoader
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    totalPrice(){
      this.totalPrice = 0
      if(this.cart){
        this.cart.forEach(item => {
            if(item.salePrice){
              this.totalPrice += (item.salePrice*item.qty)
            }else{
              this.totalPrice += (item.price*item.qty)
            }
        });
      }
      return this.totalPrice
    },
    cartEmpty(){
      if(this.cart){
        if(!this.cart[0]){
          this.cartEmpty = true
        }else{
          this.cartEmpty = false
        }
        return this.cartEmpty
      }
    }
  },
  created() {
    if(!this.currentUser){
      this.$router.push("/");
      this.$emit('toggleLogin')
    }
  },
  methods: {
    confirmClearCart(){
      let action = `Do you want to proceed with this purchase? The total is R${this.totalPrice}`
      let actionSuccess = 'Purchase Successful!'
      this.$emit('confirmClearCart', action, actionSuccess)
    },
    removeProduct(productId){
        this.message = "";
        this.loading = true;
        CartService.removeCartItem(productId).then(
            (response) => {
            this.message = response.message;
            this.loading = false;
            const user = JSON.parse(localStorage.getItem("user"));
            user.accessToken = response.data.accessToken
            localStorage.setItem('user', JSON.stringify(user));
            this.$emit('refreshCart')
            location.reload()
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
    updateQty(productId, quantity){
        this.message = "";
        this.loading = true;
        CartService.updateQuantity(productId, quantity).then(
            (response) => {
            this.message = response.message;
            this.loading = false;
            const user = JSON.parse(localStorage.getItem("user"));
            user.accessToken = response.data.accessToken
            localStorage.setItem('user', JSON.stringify(user));
            this.$emit('refreshCart')
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
    }
  },
}
</script>

<style>
  .loaderCart{
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.418);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .emptyMessage{
    padding: 5rem 0;
    opacity: 0.6;
  }
  .cart{
    width: 100%;
    position: relative;
  }
  .checkout #addProductBtn{
    height: fit-content;
    background: transparent;
    width: 100%;
  }
  .total{
    margin-top: 1rem;
  }
  .checkoutRow{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
  }
  .checkoutHeader{
    flex-wrap: wrap;
    height: fit-content !important;
  }
  .checkout{
    width: 25%;
    margin-left: 2rem;
  }
  #cartSection{
    display: flex;
    padding-top: 5rem;
  }

  @media screen and (max-width: 860px) {
    .checkout{
      width: 100%;
      margin: 0;
      margin-top: 2rem;
      margin-bottom: 5rem;
    }
    #cartSection{
      flex-direction: column;
      padding-top: 5rem;
    }
  }
</style>