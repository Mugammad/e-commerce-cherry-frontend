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
            <Field name="category" type="text" class="form-content" placeholder="Choose Category" :value="product.category"/>
            <ErrorMessage name="category" class="error-feedback" />
          </div>
          <div class="form-group">
            <Field name="size" type="text" class="form-content" placeholder="Size" :value="product.size"/>
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
            <Field name="price" type="number" class="form-content" placeholder="Price in ZAR" :value="product.price"/>
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form-group">
            <Field name="description" type="text" class="form-content desription" placeholder="Description" :value="product.description"/>
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form-group">
            <Field name="qty" type="number" class="form-content" placeholder="Quantity" :value="product.qty"/>
            <transition name="fade">
              <ErrorMessage name="qty" class="error-feedback" />
            </transition>
          </div>
          <div class="bottomModal">
            <div class="form-group">
              <button id="addProductBtn" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Save changes</span>
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
      productId: null
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