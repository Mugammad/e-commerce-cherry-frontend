<template>
  <div id="nav">
    <div class="navStart">
      <router-link v-if="!this.isAdmin" class="navLink" to="/">Shop</router-link>
      <router-link v-if="this.isAdmin" class="navLink" to="/admin">Admin Board</router-link>
    </div>
    <div class="navEnd">
        <div>
            <router-link class="navLink" to="/cart">Cart <span v-if="cartQty" id="cartQty">{{cartQty}}</span></router-link>
            <button v-if="!this.currentUser" @click="toggleLogin()">Login</button>
            <button v-if="!this.currentUser" @click="toggleSignUp()">Sign up</button>
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
    #cartQty{
      font-size: 0.8rem;
      background: var(--brown);
      color: white;
      height: 20px;
      min-width: 20px;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      margin: 0 0.5rem;
    }
    .navEnd, .navStart{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
    }
    .navEnd *, .navStart *{
        display: flex;
        align-items: center;
    }
    button{
        border: none;
        background: none;
        display: block;
        cursor: pointer;
        flex-shrink: 0;
        width: fit-content;
    }

    #nav{
        height: 54px;
        background: aliceblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navLink, button{
        padding: 0 10px;
        height: 100%;
        flex-shrink: 0;
    }

    #nav {
      padding: 0 10%;
      background: var(--pink);
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

    .dropdown ul li{
        text-decoration: none;
        list-style-type: none;
        cursor: pointer;
        opacity: 0.6;
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
    .dropdown a svg{
      fill: var(--brown);
      width: 15px;
      height: 15px;
    }

</style>