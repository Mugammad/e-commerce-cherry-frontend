<template>
  <h1>this is cart</h1>
</template>

<script>
export default {
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