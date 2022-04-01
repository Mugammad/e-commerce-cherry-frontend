<template>
  <div class="background" @click.self="toggleViewProduct">
    <div class="singleProduct">
        <div v-if="product" class="inside">
            <img :src="product.img" alt="">
            <div class="singleProductInfo">
                <h2 class="productTitle">{{ product.title }}</h2>
                <h4 v-if="!product.salePrice" class="price priceMain"><span class="randSymbol">R</span>{{ product.price }}</h4>
                <div v-else class="priceMain">
                    <h4 class="price"><span class="randSymbol">R</span>{{ product.salePrice }}</h4>
                    <h4 >ON SALE <span class="sale">{{Math.round(((product.price - product.salePrice)/product.price)*100)}}% OFF</span></h4>
                </div>
                <h4>Size: {{product.size}}</h4>
                <Form @submit="addToCart(product)" :validation-schema="schema">
                    <div class="form-group">
                        <div class="input">
                            <h4>Qty:</h4>
                            <Field name="qty" type="number" class="form-content" min-value="1" value="1" v-model="qty"/>
                        </div>
                      <ErrorMessage name="qty" class="error-feedback" />
                    </div>
                    <div class="form-group cartBtn">
                      <button id="addProductBtn" :disabled="loading">
                        <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
                        <span v-show="!loading">Add to cart</span>
                      </button>
                    </div>
                    <!-- <a :to="{ name: 'SignUp' }" id="signup">Don't have account yet?</a> -->
                    <div class="form-group">
                      <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                      </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import CartService from '../services/cart.services'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    data() {
    const schema = yup.object().shape({
      qty: yup
        .number()
        .required("Qty is required!")
    });
        return {
            qty: 1,
            message: '',
            loading: false
        }
    },
    props: [
        'product'
    ],
    computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
    },
    components: {
      Form,
      Field,
      ErrorMessage,
      PulseLoader
    },
    methods: {
        toggleViewProduct(){
            this.$emit('toggleViewProduct')
        },
        addToCart(product){
            this.loading = true;
            if(!this.currentUser){
                this.$emit('toggleViewProduct')
                this.$emit('toggleLogin')
                this.$router.push("/");
            }else{
            CartService.addToCart(product._id, parseInt(this.qty)).then(
                (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                const user = JSON.parse(localStorage.getItem("user"));
                user.accessToken = response.data.accessToken
                localStorage.setItem('user', JSON.stringify(user));
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
            );
            }
        }
    },
}
</script>

<style>
    .cartBtn #addProductBtn{
        background: white;
    }
    .randSymbol{
        font-size: 2rem;
        margin-right: 0.3rem;
    }
    .singleProduct{
        width: 100%;
        height: 100%;
        background: white;
        overflow-y: scroll;
    }
    .inside img{
        width: 40%;
        height: 400px;
        object-fit: cover;
    }
    .inside{
        display: flex;
        padding: 2rem;
        text-align: left;
    }
    
    
    .singleProductInfo *{
        padding: 0;
        margin: 0;
    }
    .singleProductInfo{
        width: 55%;
        margin-left: 5%;
        column-gap: 1rem;
    }
    .productTitle{
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 860px) {
        .inside{
            flex-wrap: wrap;
        }
        .inside img{
            width: 100%;
        }
        .singleProductInfo{
        width: 100%;
        margin-top: 5%;
        }
    }

    .background{
        z-index: 102;
    }
</style>