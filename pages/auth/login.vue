<template>
  <div
    :style="{
      minHeight: '100vh',
      backgroundImage: 'url(' + Underground + ')',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '60% 70%',
      backgroundPosition: 'right bottom'
    }"
  >
    <v-container fill-height style="height: 100vh">
      <v-row>
        <v-col cols="12" md="7" sm="9">
          <v-card class="px-3 py-6 card" style="align: center">
            <v-card-subtitle class="text-center text-h4 mb-n4 font-weight-bold"
              >Sign in</v-card-subtitle
            >
            <v-card-subtitle class="text-center font-weight-medium">
              Sign in to access your account... Let's get you started!!!
            </v-card-subtitle>
            <v-form>
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="font-weight-light">Email address</div>
                  <v-text-field
                    v-model="email"
                    class="mx-0"
                    required
                    outlined
                    color="#02A2DE"
                    background-color="#ECF7FD"
                    style="border-radius: 15px;"
                  /> </v-col
              ></v-row>

              <v-row no-gutters>
                <v-col cols="12">
                  <div class="font-weight-light">Password</div>
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    class="input-group--focused"
                    outlined
                    required
                    color="#02A2DE"
                    background-color="#ECF7FD"
                    @click:append="show = !show"
                    style="border-radius: 15px;"
                  ></v-text-field> </v-col
              ></v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-btn
                    color="#33B47F"
                    @click="submit"
                    height="61px"
                    class="reg-btn mt-5"
                    block
                  >
                    <span class="white--text">Login</span>
                  </v-btn>
                </v-col></v-row
              >
              <v-row no-gutters>
                <v-col cols="12">
                  <v-btn
                    text
                    height="41px"
                    block
                    class="my-0 px-3 text-caption"
                    color="#707070"
                  >
                    forgot password?
                  </v-btn>
                </v-col></v-row
              >
              <v-row no-gutters class="mt-16 pb-5 text-center">
                <v-col cols="12" class="text-caption">
                  Not registered yet?
                  <NuxtLink :to="'/auth/register'">
                    <span style="color: #02A2DE">
                      Create an Account
                    </span></NuxtLink
                  >
                </v-col></v-row
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Underground from "../../assets/img/auth_img.png";
export default {
  layout: "auth",
  data() {
    return {
      Underground,
      email: "",
      show: false,
      password: "",
      loading: false
    };
  },
  methods: {
      async getUser(id, token) {
      this.$axios.defaults.headers["x-access-token"] = token
      const { data } = await this.$axios.get(`/users/${id}`)
      this.$store.commit("user/SET_SINGLE_USER", data.data)
      console.log(data)
    },
    submit() {
      this.loading = true;
      this.$axios
        .post("/users/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          const { data } = res;
          this.loading = false;
          if (data.code === 200) {
            localStorage.setItem("token", JSON.stringify(data.data.token));
            this.$store.commit("user/SET_USER", data.data);
            this.getUser(data.data._id, data.data.token);
            this.$store.commit("snackbar/show", {
              text: data.message,
              icon: "success"
            });
            this.$router.push(this.$route.query.redirect || "/");
          }
        })
        .catch(err => {
          this.loading = false;
          const { response } = err;
          console.log(err);
          this.$store.commit("snackbar/show", {
            text: response.data.message,
            icon: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.reg-btn {
  box-shadow: 0px 0px 30px #02a2de2e;
  border-radius: 15px;
  opacity: 1;
}
.card {
  border: 2px solid #2d3652;
  border-radius: 60px;
}
</style>
