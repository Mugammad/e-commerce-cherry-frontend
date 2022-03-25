<template>
<div class="background" @click.self="toggleAddProductModal">
    <div class="addProduct">
      <h1>New Product?</h1>
      <Form @submit="addProduct" :validation-schema="schema" class="addProductForm">
        <div class="leftModal">
          <div class="form-group">
            <Field name="title" type="text" class="form-content" placeholder="Title of Product"/>
            <ErrorMessage name="title" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Category:</h3>
              <Field name="category" as="select" class="form-content" placeholder="Choose Category">
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Headwear">Headwear</option>
              </Field>
            </div>
            <ErrorMessage name="category" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Size:</h3>
              <Field name="size" as="select" class="form-content" placeholder="Size">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
              </Field>
            </div>
            <ErrorMessage name="size" class="error-feedback" />
          </div>
          <div class="form-group">
            <Field name="img" type="text" class="form-content" placeholder="Enter Image URL" v-model="imgPreviewLink"/>
            <ErrorMessage name="img" class="error-feedback" />
            <div class="imgPreview">
              <img v-if="imgPreviewLink" :src="imgPreviewLink" alt="">
            </div>
          </div>
        </div>
        <div class="rightModal">
          <div class="form-group">
            <div class="input">
              <h3>R</h3>
              <Field name="price" type="number" class="form-content" placeholder="Price in ZAR"/>
            </div>
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form-group">
            <Field name="description" type="text" class="form-content desription" placeholder="Description"/>
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Amount in stock:</h3>
              <Field name="qty" type="number" class="form-content" placeholder="Quantity"/>
            </div>
            <transition name="fade">
              <ErrorMessage name="qty" class="error-feedback" />
            </transition>
          </div>
          <div class="bottomModal">
            <div class="form-group">
              <button id="addProductBtn" :disabled="loading">
                <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
                <span v-show="!loading">Add to database</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alertMessage" role="alert">
                {{ message }}
              </div>
            </div>
          </div>
        </div>
          
      </Form>
    </div>
 </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ProductService from '../services/product.services'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Add",
  components: {
    Form,
    Field,
    ErrorMessage,
    PulseLoader
  },
  data() {
    const schema = yup.object().shape({
      title: yup
        .string()
        .required("Title is required!")
        .min(3, "Must be at least 3 characters!"),
      category: yup
        .string()
        .required("Category is required!")
        .max(50, "Must be maximum 50 characters!"),
      size: yup
        .string()
        .required("Size is required!"),
      img: yup
        .string()
        .required("Image is required!")
        .min(6, "Must be at least 6 characters!"),
      description: yup
        .string()
        .required("Description is required!")
        .min(6, "Must be at least 6 characters!"),
      price: yup
        .string()
        .required("Price is required!"),
      qty: yup
        .string()
        .required("qty is required!")
    });
    return {
      loading: false,
      message: "",
      schema,
      imgPreviewLink: null,
    };
  },
  methods: {
    toggleAddProductModal(){
        this.$emit('toggleAddProduct')
    },
    addProduct(product) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      ProductService.create(product).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
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
      );
    },
  },
};
</script>

<style>
  .input{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .input h3{
    flex-shrink: 0;
  }
  #addProductBtn{
    background: var(--pink);
    border-radius: none;
    border: 3px solid var(--brown);
    color: var(--brown);
    font-size: 1.3rem;
    font-weight: bold;
    transition: 0.1s;
    margin-top: 2rem;
    margin-left: auto;
    opacity: 0.6;
    padding: 0 0.4rem;
  }
  #addProductBtn:hover{
    opacity: 1;
    transition: 0.3s;
  }
  .desription{
    border: 2px solid var(--brown) !important;
    padding: 0.5rem;
    min-width: 100%;
    box-sizing: border-box;
    min-height: 200px;
  }
  .addProduct{
    text-align: left;
    background: var(--pink);
    border-radius: 5px;
    padding: 1rem;
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
    height: 90%;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
  }
  .addProduct h1{
    padding: 1rem;
  }
  .background{
    padding: 2rem 10%;
    box-sizing: border-box;
  }
  .addProductForm{
    display: flex;
    flex-wrap: wrap;
  }
  .leftModal, .rightModal{
    width: 50%;
    box-sizing: border-box;
    padding: 1rem;
  }
  .error-feedback{
    color: tomato;
    margin-bottom: 1rem;
  }
  .form-content{
    border: none;
    background: transparent;
    border-bottom: 2px solid var(--brown);
    opacity: 0.6;
    transition: 0.3s;
    font-size: 1rem;
    padding: 0.5rem 0;
  }
  .form-content:focus{
    outline: none;
    opacity: 1;
    transition: 0.3s;
  }
  .fade3-enter-active,
  .fade3-leave-active {
    transition: opacity 0.3s;
  }
  .fade3-enter{
    opacity: 0;
  }
  .fade3-leave-to{
    opacity: 0;
  }
  .imgPreview{
    width: 200px;
    height: 300px;
    background: rgba(194, 189, 189, 0.3);
    border-radius: 5px;
  }
  .imgPreview img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>