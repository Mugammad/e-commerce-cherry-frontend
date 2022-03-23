<template>
  <div class="mainSection productsPage">
    <FilterPanel heading="Tops"/>
    <div class="productsContainer">
      <div class="productsHeader">
        <div class="headerStart">
          <p v-if="filteredProducts">{{filteredProducts.length}} Products found</p>
          <p v-else>0 Products found</p>
        </div>
        <div class="headerEnd">

        </div>
      </div>
        <div v-if="filteredProducts" class="products">
          <ProductCard v-for="product in filteredProducts" :key="product._id" :product="product"/>
        </div>
    </div>
  </div>
</template>

<script>
import FilterPanel from '../components/FilterPanel.vue'
import ProductCard from '../components/ProductCard.vue'
export default {
  data() {
    return {
      filteredProducts: null,
    }
  },
  props: [
    'products'
  ],
  components: {
    FilterPanel,
    ProductCard
  },
  created() {
    if(this.products){
      this.filteredProducts = this.products.filter(product => product.category == 'Tops')
      console.log(this.filteredProducts);
    }
  },
}
</script>

<style>
.products{
  display: flex;
  gap: 1.333333%;
  padding-top: 1rem;
}
  .productsPage{
    padding-top: 5rem;
    display: flex;
  }
  .productsContainer{
    width: 100%;
  }
  .productsHeader{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    border-bottom: 3px solid var(--brown);
  }
</style>