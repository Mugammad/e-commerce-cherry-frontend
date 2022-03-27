<template>
  <div class="mainSection">
    <div class="cart">
      <div v-for="item in cart" :key="item.id" class="cartItem">
          <h1>{{item.title}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'cart'
  ],
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