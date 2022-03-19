<template>
<div class="background" @click.self="toggleLogin">
    <div class="login">
      <h1>Sign Up</h1>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="form-group">
          <label for="username" style="padding-top:13px">Username</label>
          <Field name="username" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="email" style="padding-top:13px">Email</label>
          <Field name="email" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password" style="padding-top:13px">Password</label>
          <Field name="password" type="password" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button id="submit-btn" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Sign Up</span>
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