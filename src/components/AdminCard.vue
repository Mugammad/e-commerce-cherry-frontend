<template>
    <div class="adminCard">
        <div class="cardImg">
            <img :src="product.img" alt="A black and white, checkard, long sleeve shirt with hoodie">
        </div>
        <div class="cardInfo">
            <h3 class="cardTitle">{{ product.title }}</h3>
            <p class="productId"><b>Product ID:</b> {{ product._id }}</p>
            <h4 class="price">R{{ product.price }}</h4>
            <p><b>size:</b> {{ product.size }}</p>
            <p><b>Amount Available:</b> {{ product.qty }}</p>
        </div>
        <div class="cardbtns">
            <button class="editBtn" @click="this.$emit('editProduct', product)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg></button>
            <button class="delBtn" @click="pressedDelete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></button>
        </div>
        <div v-if="deletePressed" class="confirmDelete">
            <h4>Are you sure you want to delete? </h4>
            <div class="confirmButtons">
                <button @click="pressedDelete">cancel</button>
                <button @click="removeProduct(product._id)">delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '../services/product.services'
export default {
    data() {
        return {
            message: '',
            deletePressed: false
        }
    },
    props:[
        'product'
    ],
    methods: {
        pressedDelete(){
            this.deletePressed = !this.deletePressed
        },
        removeProduct(id){
            ProductService.delete(id).then(
                () => {
                    this.successful = true;
                    this.deletePressed = false
                    this.$emit('refreshProducts')
                    location.reload()
                },
                (error) => {
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful = false;
                    this.loading = false;
                }
            )
        }
    },
}
</script>

<style>
.confirmDelete{
    width: 100%;
    color: tomato;
    display: flex;
    padding: 1rem 0;
}
.confirmDelete *{
    flex-shrink: 0;
}
.confirmButtons{
    display: flex;
}
.editBtn:hover svg{
    fill: seagreen;
    transition: 0.3s;
}
.delBtn:hover svg{
    fill: tomato;
    transition: 0.3s;
}
.price{
    font-style: italic;
    font-weight: 300;
    font-size: 3rem;
}
.adminCard{
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    overflow: hidden;
    margin: 5rem 0;
}
.cardImg{
    width: 20%;
    height: 200px;
    margin-right: 2%;
}
.cardImg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.cardInfo {
    width: 68%;
    height: 200px;
    text-align: left;
    margin-right: 2%;
}
.cardInfo *{
    margin-bottom: 1rem;
}
.cardTitle{
    margin: 0;
}
.cardbtns{
    width: 8%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    opacity: 0;
    transition: 0.1s;
}
.adminCard:hover>.cardbtns{
    opacity: 1;
    transition: 0.3s;
}
.cardbtns button{
    height: fit-content;
}
.cardbtns button svg{
    width: 100%;
    height: 20px;
    fill: var(--brown);
}
.productId{
    opacity: 0.6;
    font-style: italic;
}

</style>