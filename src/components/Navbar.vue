<template>
  <div id="nav">
    <div class="navStart">
        <router-link class="navLink" to="/">Shop</router-link>
    </div>
    <div class="navEnd">
        <div>
            <router-link class="navLink" to="/cart">Cart</router-link>
            <button v-if="!this.currentUser" @click="toggleLogin()">Login</button>
            <button v-if="!this.currentUser" @click="toggleSignUp()">Sign up</button>
        </div>
        <div class="dropdown" v-if="this.currentUser">
            <a href="#">{{ currentUser.username }}</a>
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
      'userInfo'
  ],
  data() {
      return {
      }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
  }
}
</script>

<style>
    .navEnd{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
    }

    .navEnd *{
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
    }

    #nav {
      padding: 0 10%;
    }

    #nav a, #nav2 a {
      font-weight: bold;
      color: #2c3e50;
      width: 100%;
      text-decoration: none;
    }

    #nav a.router-link-exact-active, #nav2 a.router-link-exact-active {
      color: seagreen;
    }
    .dropdown{
        height: 100%;
    }
    .dropdown ul{
        position: absolute;
        background: black;
        color: white;
        padding: 10px;
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
    }
    .dropdown ul li:hover{
        background: green;
    }

</style>