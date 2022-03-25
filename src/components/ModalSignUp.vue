<template>
<div class="background" @click.self="toggleLogin">
    <div class="login">
      <h1>Sign Up</h1>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="form-group">
          <Field name="username" type="text" class="form-content" placeholder="Username"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <Field name="email" type="text" class="form-content" placeholder="Email"/>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <Field name="password" type="password" class="form-content" placeholder="Password"/>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button id="addProductBtn" :disabled="loading">
            <PulseLoader :loading="loading" color="#826251" size="0.5rem" />
            <span v-show="!loading">Create account</span>
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
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
    PulseLoader
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/account");
    }
  },
  methods: {
    toggleLogin(){
        this.$emit('toggleLogin')
    },
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.toggleLogin()
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