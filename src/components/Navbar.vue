<template>
  <div id="nav">
    <div class="navStart">
      <router-link @click="this.$emit('toggleNav')" v-if="!this.isAdmin" class="navLink" to="/">Home</router-link>
      <router-link @click="this.$emit('toggleNav')" v-if="this.isAdmin" class="navLink" to="/admin">Admin Board</router-link>
    </div>
    <div class="navEnd">
        <div class="navEndBtns">
            <router-link @click="this.$emit('toggleNav')" class="navLink" to="/cart">Cart <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/></svg><span v-if="cartQty" id="cartQty">{{cartQty}}</span></router-link>
            <button v-if="!this.currentUser" @click="toggleLogin()"><h3>Login</h3></button>
            <button v-if="!this.currentUser" @click="toggleSignUp()"><h3>Sign up</h3></button>
        </div>
        <div class="dropdown" v-if="this.currentUser">
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/></svg>{{ currentUser.username }}</a>
            <ul>
                <li><router-link class="navLink" to="/account">Account</router-link></li>
                <li><a href="" @click="logOut()">Logout</a></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
      'userInfo',
      'cartQty'
  ],
  data() {
      return {
      }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
        if(this.currentUser){
            return this.currentUser.roles.includes('ROLE_ADMIN')
        }
    }
    
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    toggleLogin(){
        this.$emit('toggleLogin')
    },
    toggleSignUp(){
        this.$emit('toggleSignUp')
    }
  },
}
</script>

<style>
    @media screen and (min-width: 860px){
      .navEnd, .navStart{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
      }
      .navEnd *, .navStart *{
        display: flex;
        align-items: center;
      }
      .dropdown{
        height: 100%;
        margin-left: 10px;
      }
      .dropdown ul{
        position: absolute;
        background: var(--pink);
        padding: 15px;
        padding-top: 0;
        top: 54px;
        display: none;
      }

      .dropdown:hover > ul {
        display: block;
      }

      .dropdown ul li a, .dropdown ul li{
        padding: 0;
        padding-top: 0.25rem;
      }
      .dropdown ul li:first-of-type{
        border-top: 1px solid var(--brown);
      }
      .dropdown ul li:hover{
        opacity: 1;
      }
      #nav{
        height: 54px;
        background: aliceblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      #nav {
        padding: 0 10%;
        background: var(--pink);
      }

    }
    .navEndBtns *:hover{
      color: var(--brown);
      transition: 0.3s;
    }
    .navLink svg{
      height: 20px;
      width: 20px;
      fill: var(--brown);
      margin-left: 0.5rem;
    }
    #cartQty{
      font-size: 0.8rem;
      background: var(--brown);
      color: white;
      height: 20px;
      min-width: 20px;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      margin-left: 0.5rem;
    }
    button{
        border: none;
        background: none;
        display: block;
        cursor: pointer;
        flex-shrink: 0;
        width: fit-content;
    }

    .navLink, button{
        padding: 0 10px;
        height: 100%;
        flex-shrink: 0;
    }

    #nav a, #nav2 a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
    }

    #nav a.router-link-exact-active, #nav2 a.router-link-exact-active {
      color: seagreen;
      background: white;
      
    }

    .dropdown ul li{
        text-decoration: none;
        list-style-type: none;
        cursor: pointer;
        opacity: 0.6;
      }
    
    .dropdown a svg{
      fill: var(--brown);
      width: 15px;
      height: 15px;
    }
    @media screen and (max-width: 860px){
      .navStart, .navEnd{
        text-align: start;
        padding-top: 1rem
      }
      .navEndBtns button{
        padding-top: 1rem;
      }
      .navName{
        display: none;
      }
      .notMobile{
        display: none;
      }
    }
</style>