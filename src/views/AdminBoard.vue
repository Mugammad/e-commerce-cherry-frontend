<template>
  <div class="mainSection">
    <h1>this is admin board</h1>
    <button @click="toggleAddProductModal">Add Product</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    toggleAddProductModal(){
      this.$emit('toggleAddProduct')
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

</style>