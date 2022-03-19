<template>
  <Navbar :userInfo="userInfo" @toggleLogin="toggleLogin" @toggleSignUp="toggleSignUp"/>
  <Navbar2/>
  <ModalLogin v-if="showLoginModal" @toggleLogin="toggleLogin"/>
  <ModalSignUp v-if="showSignUpModal" @toggleLogin="toggleSignUp"/>
  <router-view @toggleLogin="toggleLogin"/>
</template>

<script>
// import UserService from "./services/user.service";

import Navbar from "./components/Navbar.vue"
import Navbar2 from './components/Navbar2.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalSignUp from './components/ModalSignUp.vue'
export default {
  components: {
    Navbar,
    Navbar2,
    ModalLogin,
    ModalSignUp
  },
  data() {
    return {
      userInfo: "",
      showLoginModal: false,
      showSignUpModal: false
    }
  },
  methods: {
    toggleLogin(){
      this.showLoginModal = !this.showLoginModal
    },
    toggleSignUp(){
      this.showSignUpModal = !this.showSignUpModal
    }
  },
  // created() {
  //   UserService.getUserInfo().then(
  //     (response) => {
  //       this.userInfo = response.data;
  //     },
  //     (error) => {
  //       this.userInfo =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //     }
  //   );
  // },
}
</script>

<style>
*{
  padding: 0;
  margin: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
