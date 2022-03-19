<template>
<div class="background" @click.self="toggleLogin">
    <div class="login">
      <h1>LOGIN</h1>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username" style="padding-top:13px">Username</label>
          <Field name="username" type="text" class="form-content" />
          <div class="form-border"></div>
          <ErrorMessage name="username" class="error-feedback" />
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
            <span>Login</span>
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
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
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
    currentUser() {
      return this.$store.state.auth.user;
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
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          if(this.currentUser.roles.includes("ROLE_ADMIN")){
              this.$router.push("/admin");
          }else{
            this.$router.push("/account");
          }
          this.toggleLogin()
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
Form{
  margin-top: 20px;
}
#submit-btn{
    background: black;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    color: white;
    margin: 0 auto;
}

.form-content{
    width: 100%;
    margin: 20px 0;
}

.background{
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
}

.login{
    max-width: 500px;
    width: 100%;
    padding: 20px;
    background: aliceblue;
    border-radius: 5px;
    margin: 0 auto;
}
</style>