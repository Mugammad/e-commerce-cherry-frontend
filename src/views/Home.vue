<template>
  <div id="home" class="mainSection">
    <div id="hero" class="section">
      <div class="imagePlaceholder">
        <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" alt="">
      </div>
      <div class="heroBtns">
        <router-link class="herobtn" to="/products"><h3>TOPS</h3></router-link>
        <router-link class="herobtn" to="/bottoms"><h3>BOTTOMS</h3></router-link>
        <router-link class="herobtn" to="/dresses"><h3>DRESSES</h3></router-link>
        <router-link class="herobtn" to="/headwear"><h3>HEADWEAR</h3></router-link>
      </div>
    </div>
    <div v-if="products" class="sectionLabel">
      <h1>NEW IN STOCK</h1>
    </div>
    <div v-if="products" id="newStock" class="section">
      <div class="newProducts">
        <div @click="viewProduct(products[products.length-1])" class="newStockimg1" :style="`background-image: url('${products[products.length-1].img}');`">
          <div class="hoverInfo"><h1>{{products[products.length-1].title}}</h1></div>
        </div>
        <div @click="viewProduct(products[products.length-2])" class="newStockimg2" :style="`background-image: url('${products[products.length-2].img}');`">
          <div class="hoverInfo"><h1>{{products[products.length-2].title}}</h1></div>
        </div>
        <div @click="viewProduct(products[products.length-3])" class="newStockimg3" :style="`background-image: url('${products[products.length-3].img}');`">
          <div class="hoverInfo"><h1>{{products[products.length-3].title}}</h1></div>
        </div>
        <div @click="viewProduct(products[products.length-4])" class="newStockimg4" :style="`background-image: url('${products[products.length-4].img}');`">
          <div class="hoverInfo"><h1>{{products[products.length-4].title}}</h1></div>
        </div>
      </div>
    </div>
    <div v-if="saleProducts" class="sectionLabel">
      <h1>ON SALE</h1>
    </div>
    <div v-if="saleProducts" class="section" id="onSale">
      <div class="saleItems">
        <div v-for="(sale, i) of saleProducts" :key="sale._id" class="saleItem">
          <div v-if="i<4" @click="viewProduct(sale)">
            <img :src="sale.img" alt="">
            <div class="productBrief">
                <span>{{ sale.title }}</span>
                <h3>ONLY <b>R{{ sale.salePrice }}</b></h3>
                <h4>WAS R{{ sale.price }}</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- <a href="">view more</a> -->
    </div>
    <div class="loader" v-if="loading">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'Home',
  props: [
    'products'
  ],
  data() {
    return {
      saleProducts: null,
      loading: false,
      color: '#826251'
    }
  },
  components: {
    PulseLoader
  },
  methods: {
    viewProduct(product){
      this.$emit('viewProduct', product)
    }
  },
  computed: {
    saleProducts() {
        if(this.products != ''){
              this.saleProducts = this.products.filter(product => product.salePrice)
            return this.saleProducts
        }
    },
    loading(){
      if(this.products == ''){
        this.loading = true
      }else{
        this.loading = false
      }
      return this.loading
    }
  },
}
</script>

<style>
  .imagePlaceholder img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(90%);
  }
  .loader{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: rgba(255, 255, 255, 0.493);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .productBrief h4{
    opacity: 0.6;
  }
  .sectionLabel{
    position: absolute;
    width: 80%;
    margin-top: -18.5px;
  }
  .sectionLabel h1{
    width: fit-content;
    margin: 0 auto;
    padding: 0 7px;
    background: white;
  }
  #onSale{
    border: none;
  }
  .saleItems{
    display: flex;
    flex-wrap: wrap;
    gap: 1.333333333%;
    justify-content: center;
    width: 100%;
  }
  .saleItem{
    width: 24%;
    cursor: pointer;
  }
  .saleItem img{
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .section{
    padding: 100px 0;
    border-bottom: 0.3px solid rgb(46, 43, 43);
  }
  .imagePlaceholder{
    background: grey;
    height: 400px;
    width: 100%;
  }
  #hero{
    display: flex;
    flex-wrap: wrap;
  }
  .heroBtns{
    display: flex;
    width: 100%;
  }

  .heroBtns .herobtn{
    width: 25%;
    height: 80px;
    background: var(--pink);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    transition: 0.1s;
  }

  .heroBtns .herobtn:hover{
    background: var(--brown);
    color: white;
    transition: 0.3s;
  }
  
  .newProducts{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 5fr);
    grid-template-rows: repeat(2, 5fr);
    width: 100%;
    height: 400px;
  }

  .newProducts div{
    background-size: cover;
    cursor: pointer;
  }

  .hoverInfo{
    color: aliceblue;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: 0.3s;
  }

  .hoverInfo:hover{
    opacity: 1;
    transition: 0.3s;
  }

  .newStockimg1{
    grid-column: 1/span 1;
    grid-row: 1/span 2;
    background: yellowgreen;
  }
  .newStockimg4{
    grid-column: 3/span 1;
    grid-row: 1/span 2;
    background: yellowgreen;
  }
  .newStockimg2{
    grid-column: 2/span 1;
    grid-row: 1/span 1;
    background: blueviolet;
  }
  .newStockimg3{
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    background: blue;
  }
</style>
