<template>
  <div class="productCard" @click="viewProduct(product)">
      <div class="productImg">
          <img :src="product.img" alt="">
      </div>
      <div class="productBrief">
          <span>{{ product.title }}</span>
          <h3 v-if="product.salePrice">R{{ product.salePrice }}</h3>
          <h4 v-if="product.salePrice" class="sale">ON SALE</h4>
          <h3 v-else>R{{ product.price }}</h3>
      </div>
  </div>
</template>

<script>
export default {
    props: [
        'product'
    ],
    methods: {
        viewProduct(product){
            this.$emit('viewProduct', product)
        }
    },
}
</script>

<style>
    .sale{
        color: seagreen;
    }
    .productCard{
        max-width: 200px;
        height: 300px;
        cursor: pointer;
    }
    .productCard .productImg{
        width: 100%;
        height: 200px;
    }
    .productImg img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .productBrief span{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .productBrief {
        overflow: hidden;
        text-align: left;
    }
    .productBrief *{
        padding-top: 0.3rem;
    }
    .productBrief h3{
        font-style: italic;
        font-weight: 400;
        font-size: 1.5rem;
    }
</style>