<template>
  <h1>this is admin board</h1>
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
      }else if(!this.currentUser.roles.includes('ROLE_ADMIN')){
          console.log("unauthorized")
          this.$router.push("/");
      }
  },
}
</script>

<style>

</style>