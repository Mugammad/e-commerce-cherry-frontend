<template>
  <div class="mainSection">
    <button @click="toggleAddProductModal" id="add"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg><span id="addLabel"><h4>ADD PRODUCT</h4></span></button>
    <div class="productsHeader">
        <div class="headerStart">
          <p v-if="products">{{products.length}} Products found</p>
          <p v-else>0 Products found</p>
        </div>
        <div class="headerEnd">

        </div>
    </div>
    <div class="productsContainer">
        <AdminCard v-for="product in products" :key="product._id" :product="product" @editProduct="editProduct"/>
    </div>
  </div>
</template>

<script>
import AdminCard from '../components/AdminCard.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
    AdminCard
  },
  props: [
    'products'
  ],
  methods: {
    toggleAddProductModal(){
      this.$emit('toggleAddProduct')
    },
    editProduct(product){
      this.$emit('editProduct', product)
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
      if(!this.currentUser){
          this.$router.push("/");
      }else if(!this.currentUser.roles.includes('ROLE_ADMIN')){
          console.log("unauthorized")
          this.$router.push("/");
      }
  },
}
</script>

<style>
  #add{
    width: 50px;
    height: 50px;
    border: 3px solid var(--brown);
    /* border-radius: 25px; */
    display: flex;
    justify-content: left;
    align-items: center;
    overflow: hidden;
    transition: 0.3s;
    margin: 5rem 0;
  }
  #add svg{
    width: 20px;
    height: 20px;
    margin: 0 2px;
    fill: var(--brown);
  }
  #add #addLabel{
    opacity: 0;
    color: var(--brown);
    transition: 0.5s;
  }
  #add:hover{
    width: 150px;
    transition: 0.5s;
  }

  #add:hover #addLabel{
    opacity: 1;
    transition: 0.5s;
  }
  #add svg, #add #addLabel{
    flex-shrink: 0;
  }
</style>