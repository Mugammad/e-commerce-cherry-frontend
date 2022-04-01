<template>
    <div id="navMobile">
        <div class="navStart">
            <h1 id="storeLogo">Cherry Blossom Couture</h1>
         </div>
        <Navbar @toggleNav="this.$emit('toggleNav')" @toggleLogin="this.$emit('toggleLogin')" @toggleSignUp="this.$emit('toggleSignUp')"/>
        <Navbar2 @toggleNav="this.$emit('toggleNav')"/>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import Navbar2 from './Navbar2.vue'
export default {
    props: [
        'showNavMobile'
    ],
    components: {
        Navbar,
        Navbar2
    }
}
</script>

<style>
    #navMobile{
        position: fixed;
        max-width: 300px;
        width: 100%;
        background: white;
        top: 0;
        height: 100vh;
        box-sizing: border-box;
        padding: 20px;
        z-index: 100;
    }
    .navMobileBg {
        top: 0;
      width: 100%;
      height: 100vh;
      position: fixed;
      background: rgba(0, 0, 0, 0.329);
    }
</style>