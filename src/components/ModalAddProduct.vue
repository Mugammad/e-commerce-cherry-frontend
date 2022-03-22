<template>
<div class="background" @click.self="toggleAddProductModal">
    <div class="login">
      <h1>ADD PRODUCT</h1>
      <Form @submit="addProduct" :validation-schema="schema">
        <div class="form-group">
          <label for="title" style="padding-top:13px">Title</label>
          <Field name="title" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="category" style="padding-top:13px">Category</label>
          <Field name="category" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="category" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="size" style="padding-top:13px">Size</label>
          <Field name="size" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="size" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="img" style="padding-top:13px">Image</label>
          <Field name="img" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="img" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="price" style="padding-top:13px">Price</label>
          <Field name="price" type="number" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="description" style="padding-top:13px">Description</label>
          <Field name="description" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="qty" style="padding-top:13px">Quantity added</label>
          <Field name="qty" type="number" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="qty" class="error-feedback" />
        </div>
        <div class="form-group">
          <button id="submit-btn" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Add</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
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
  name: "Login",
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
        .min(3, "Must be at least 3 characters!")
        .max(50, "Must be maximum 50 characters!"),
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
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
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
          this.toggleAddProductModal()
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