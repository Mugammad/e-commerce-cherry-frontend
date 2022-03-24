<template>
  <div class="productCard">
      <div class="productImg">
          <img :src="product.img" alt="">
      </div>
      <div class="productBrief">
          <span>{{ product.title }}</span>
          <h3>R{{ product.price }}</h3>
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
        max-width: 200px;
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