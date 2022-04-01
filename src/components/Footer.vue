<template>
  <div id="footer">
      <div class="footerHeader">
          <h1 id="storeLogo">Cherry Blossom Couture</h1>
      </div>
      <div class="footerInfo">
          <ul class="footerLinks" id="accountLinks">
              <h4>Account</h4>
              <li><a href="">Account info</a></li>
              <li><a href="">Orders</a></li>
              <li><a href="">Log out</a></li>
          </ul>
          <ul class="footerLinks" id="StoreLinks">
              <h4>Our Store</h4>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="">Partners</a></li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .footerHeader{
        padding-bottom: 3rem;
        width: 100%;
    }
    .footerHeader #storeLogo{
        color: white;
    }
    .footerInfo{
        display: flex;
        gap: 3rem;
    }
    #footer{
        background: grey;
        color: white;
        text-align: left;
    }
    .footerLinks h4{
        padding: 0.5rem 0;
    }
    .footerLinks li{
        list-style-type: none;
        padding: 0.2rem 0;
    }
    .footerLinks li a {
        color: white;
        opacity: 0.5;
    }
    a{
        text-decoration: none;
    }
    #footer{
        padding: 4rem 10%;
        text-align: left;
    }
</style>