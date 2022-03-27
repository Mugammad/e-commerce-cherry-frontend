<template>
  <div class="mainSection">
    <div class="cart">
      <CartCard v-for="item in cart" :key="item.id" :cartItem="item" />
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
export default {
  props: [
    'cart'
  ],
  components: {
    CartCard
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if(!this.currentUser){
      this.$router.push("/");
      this.$emit('toggleLogin')
    }
  },
}
</script>

<style>

</style>