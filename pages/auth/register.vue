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
    <v-container fill-height style="min-height: 100vh">
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
                  <div class="font-weight-light">fullname</div>
                  <v-text-field
                    v-model="fullname"
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
                  <div class="font-weight-light">Phone Number</div>
                  <v-text-field
                    v-model="phonenumber"
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
                  <div class="font-weight-light">Location(City)</div>
                  <v-autocomplete
                    v-model="city"
                    :items="getCities"
                    item-text="name"
                    selection-text="name"
                    outlined
                    return-object
                    color="#02A2DE"
                    class="mx-0"
                    background-color="#ECF7FD"
                    style="border-radius: 15px;"
                  >
                  </v-autocomplete> </v-col
              ></v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="font-weight-light">Gender</div>
                  <v-select
                    v-model="gender"
                    :items="['Male', 'Female']"
                    class="mx-0"
                    color="#02A2DE"
                    background-color="#ECF7FD"
                    style="border-radius: 15px;"
                    data-vv-name="select"
                    required
                    outlined
                  ></v-select> </v-col
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
                  <div class="font-weight-light">Confirm Password</div>
                  <v-text-field
                    v-model="password2"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    class="input-group--focused"
                    outlined
                    required
                    color="#02A2DE"
                    :rules="[v => v === password || 'Password do not match']"
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
                    :loading="loading"
                    block
                  >
                    <span class="white--text">Get Started</span>
                  </v-btn>
                </v-col></v-row
              >
              <!-- <v-row no-gutters>
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
              > -->
              <v-row no-gutters class="mt-16 pb-5 text-center">
                <v-col cols="12" class="text-caption">
                  Already have an account?
                  <NuxtLink :to="'/auth/login'">
                    <span style="color: #02A2DE">
                      Sign In
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
import { City } from "country-state-city";

export default {
  layout: "auth",
  data() {
    return {
      Underground,
      email: "",
      show: false,
      show2: false,
      password: "",
      password2: "",
      loading: false,
      gender: null,
      fullname: "",
      phonenumber: "",
      city: ""
    };
  },
  computed: {
    getCities() {
      return City.getCitiesOfCountry("NG").map(cities => ({
        name: cities.name,
        longitude: cities.longitude,
        latitude: cities.latitude
      }));
    }
  },
  methods: {
    submit() {
      this.loading = true;
      const obj = {
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        phonenumber: this.phonenumber,
        gender: this.gender,
        location: {
          address: this.city?.name,
          lat: this.city?.latitude,
          lng: this.city?.longitude
        }
      };
      this.$axios
        .post("/users", obj)
        .then(res => {
          const { data } = res;
          this.loading = false;
          if (data?.code === 200) {
            console.log(data);
            this.$store.commit("user/SET_USER", data.data);
            this.$store.commit("snackbar/show", {
              text: data.message,
              icon: "success"
            });
            this.$router.replace("/login");
            // this.dialog = true
          } else if (data?.state === "ERROR") {
            this.$store.commit("snackbar/show", {
              text: data.message,
              icon: "success"
            });
            return;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          const { response } = err;
          console.log(err, response);
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
