<template>
  <div v-if="!this.isAdmin" id="nav2">
    <div class="navStart">
        <h1>Store LOGO</h1>
    </div>
    <div class="navMiddle">
        <ul>
            <li>
                <router-link class="navLink category filterLink" to="/products"><span class="borderLinkTop"></span>PRODUCTS<span class="borderLink"></span></router-link>
                <div class="borderLeft"></div>
            </li>
        </ul>
    </div>
    <div class="navEnd">
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style>
    .navMiddle ul{
        height: 50%;
    }
    .navMiddle ul li{
        list-style-type: none;
        border-right: 1px solid black;
        height: 100%;
        font-size: 15px;
    }
    .navStart, .navEnd{
        flex-shrink: 0;
    }
    #nav2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10% ;
        height: 64px;
    }
    .navMiddle{
        height: 100%;
        width: 100%;
        text-align: start;
        display: flex;
        align-items: center;
        margin: 0 20px;
    }

    .navMiddle *{
        display: flex;
        align-items: center;
    }
</style>