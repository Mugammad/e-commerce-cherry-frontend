<template>
  <div class="productCard">
      <div class="productImg">
          <img :src="product.img" alt="">
      </div>
      <div class="productBrief">
          <h3>{{ product.title }}</h3>
      </div>
  </div>
</template>

<script>
export default {
    props: [
        'product'
    ]
}
</script>

<style>
    .productCard{
        width: 24%;
        height: 300px;
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
</style>