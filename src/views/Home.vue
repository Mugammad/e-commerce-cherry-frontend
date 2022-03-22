<template>
  <div class="home">
    <div id="hero" class="section">
      <div class="imagePlaceholder"></div>
      <div class="heroBtns">
        <button>Tops</button><button>Dresses</button><button>Pants</button><button>Scarves</button>
      </div>
    </div>
    <div class="sectionLabel">
      <h1>NEW IN STOCK</h1>
    </div>
    <div id="newStock" class="section">
      <div class="newProducts">
        <div class="newStockimg1" style="background-image: url('https://imgaz1.chiccdn.com/thumb/large/oaupload/newchic/images/D7/F0/c52394d3-2eda-4e09-a045-7e509a224ed6.jpg');">
          <div class="hoverInfo"><h1>hover info</h1></div>
        </div>
        <div class="newStockimg2">
          <div class="hoverInfo"><h1>hover info</h1></div>
        </div>
        <div class="newStockimg3">
          <div class="hoverInfo"><h1>hover info</h1></div>
        </div>
        <div class="newStockimg4">
          <div class="hoverInfo"><h1>hover info</h1></div>
        </div>
      </div>
    </div>
    <div class="sectionLabel">
      <h1>ON SALE</h1>
    </div>
    <div class="section" id="onSale">
      <div class="saleItems">
        <div class="saleItem"></div>
        <div class="saleItem"></div>
        <div class="saleItem"></div>
        <div class="saleItem"></div>
      </div>
      <a href="">view more</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>

<style>
  .sectionLabel{
    position: absolute;
    width: 80%;
    margin-top: -18.5px;
  }
  .sectionLabel h1{
    width: fit-content;
    margin: 0 auto;
    padding: 0 7px;
    background: white;
  }
  #onSale{
    border: none;
  }
  .saleItems{
    display: flex;
    flex-wrap: wrap;
    gap: 1.333333333%;
    justify-content: center;
    width: 100%;
  }
  .saleItem{
    width: 24%;
    height: 400px;
    background: grey;
  }
  .section{
    padding: 100px 0;
    border-bottom: 0.3px solid rgb(46, 43, 43);
  }
  .imagePlaceholder{
    background: grey;
    height: 400px;
    width: 100%;
  }
  .home{
    margin: 0 10%;
  }
  #hero{
    display: flex;
    flex-wrap: wrap;
  }
  .heroBtns{
    display: flex;
    width: 100%;
  }

  .heroBtns button{
    width: 25%;
    height: 80px;
    background: var(--pink);
    transition: 0.1s;
  }

  .heroBtns button:hover{
    background: black;
    color: white;
    transition: 0.3s;
  }
  
  .newProducts{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 5fr);
    grid-template-rows: repeat(2, 5fr);
    width: 100%;
    height: 400px;
  }

  .newProducts div{
    background-size: cover;
  }

  .hoverInfo{
    color: aliceblue;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: 0.3s;
  }

  .hoverInfo:hover{
    opacity: 1;
    transition: 0.3s;
  }

  .newStockimg1{
    grid-column: 1/span 1;
    grid-row: 1/span 2;
    background: yellowgreen;
  }
  .newStockimg4{
    grid-column: 3/span 1;
    grid-row: 1/span 2;
    background: yellowgreen;
  }
  .newStockimg2{
    grid-column: 2/span 1;
    grid-row: 1/span 1;
    background: blueviolet;
  }
  .newStockimg3{
    grid-column: 2/span 1;
    grid-row: 2/span 1;
    background: blue;
  }
</style>
