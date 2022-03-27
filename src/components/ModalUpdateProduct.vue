<template>
<div class="background" @click.self="toggleAddProductModal">
    <div class="addProduct">
      <h1>New stock or what?</h1>
      <Form @submit="updateProduct" :validation-schema="schema" class="addProductForm">
        <div class="leftModal">
          <div class="form-group">
            <Field name="title" type="text" class="form-content" placeholder="Title of Product" :value="product.title"/>
            <ErrorMessage name="title" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Category:</h3>
              <Field name="category" as="select" class="form-content" placeholder="Choose Category" :value="product.category">
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
              <Field name="size" as="select" class="form-content" placeholder="Size" :value="product.size">
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
              <Field name="price" type="number" class="form-content" placeholder="Price in ZAR" :value="product.price"/>
            </div>
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Sale Price?</h3>
              <Field name="salePrice" type="number" class="form-content" placeholder="Price if item is on sale" :value="product.salePrice"/>
            </div>
          </div>
          <div class="form-group">
            <Field name="description" type="text" class="form-content desription" placeholder="Description" :value="product.description"/>
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form-group">
            <div class="input">
              <h3>Amount in stock:</h3>
              <Field name="qty" type="number" class="form-content" placeholder="Quantity" :value="product.qty"/>
            </div>
            <transition name="fade">
              <ErrorMessage name="qty" class="error-feedback" />
            </transition>
          </div>
          <div class="bottomModal">
            <div class="form-group">
              <button id="addProductBtn" :disabled="loading">
                <pulse-loader :loading="loading" color="#826251" size="0.5rem"></pulse-loader>
                <span v-show="!loading">Save changes</span>
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
  name: "Update",
  props:[
    'product'
  ],
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
      productId: null,
    };
  },
  methods: {
    toggleAddProductModal(){
        this.$emit('toggleAddProduct')
    },
    updateProduct(newProduct) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      const productID = this.productId
      ProductService.updateProduct(newProduct, productID).then(
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
  computed: {
    imgPreviewLink(){
      if(this.product){
        this.imgPreviewLink = this.product.img
        this.productId = this.product._id
        return this.imgPreviewLink
      }
    }
  }
};
</script>