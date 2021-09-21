<template>
  <div>
    <v-card class="mb-12" color="lighten-1">
      <v-row no-gutters justify="center" class="mx-auto">
        <v-col cols="12" md="9">
          <div class="font-weight-light">Age</div>
          <v-text-field
            v-model="age"
            placeholder="Select age"
            title="Age"
            outlined
            color="#02A2DE"
            background-color="#ECF7FD"
            rounded
            required
          />
        </v-col>
        <v-col cols="12" md="9">
          <div class="font-weight-light">Body Weight(kg)</div>
          <v-text-field
            type="number"
            placeholder="Select body weight"
            v-model="user.weight"
            title="body-weight"
            outlined
            color="#02A2DE"
            background-color="#ECF7FD"
            rounded
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="9">
          <div class="font-weight-light">Gender</div>
          <v-select
            v-model="gender"
            placeholder="Select gender"
            :items="['male', 'female']"
            title="gender"
            color="#02A2DE"
            outlined
            rounded
            background-color="#ECF7FD"
            required
          ></v-select>
        </v-col></v-row
      >
    </v-card>
    <v-row no-gutters justify="center" class="mx-auto">
      <v-col cols="12" md="9">
        <v-btn
          color="#33B47F"
          @click="next"
          :loading="saving"
          height="61px"
          class="continue-btn"
          block
          large
        >
          <span class="white--text">Next</span>
        </v-btn>
      </v-col></v-row
    >
  </div>
</template>
<script>
export default {
  // middleware: "authenticated",

  computed: {
    user() {
      return this.$store.state.user.user;
    },
    age() {
      // const user = this.$store.state.user.user.date_of_birth;
      // var today = new Date();
      // var birthDate = new Date(user);
      // var age = today.getFullYear() - birthDate.getFullYear();
      // var m = today.getMonth() - birthDate.getMonth();
      // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      //   age--;
      // }
      // // console.log("age", age);
      // return [age];
    }
  },
  data() {
    // const user = this.$store.state.user.user;
    return {
      // age: null,
      weight: null,
      gender: null,
      saving: false,
      age: ""
      // user: [],
    };
  },

  methods: {
    processForm() {
      this.saving = true;

      const Data = {
        weight: this.user.weight
      };
      this.$axios
        .put(`/v1/user/update/info`, Data)
        .then(({ data }) => {
          if (data.state === "OK") {
            this.$store.commit("snackbar/show", {
              text: "Medical Details information updated successfully",
              icon: "success"
            });
            this.$store.commit("user/setUser", { ...this.user, ...Data });
            this.$router.push(`/symptoms-checker/symptom-selection`);
          } else {
            this.$store.commit("snackbar/show", {
              text: data.message ? data.message : data.payload,
              icon: "error"
            });
          }
        })
        .catch(err => {
          const { response, message } = err;
          this.$store.commit("snackbar/show", {
            text: (response && response.statusText) || message,
            icon: "error"
          });
        })
        .finally(() => (this.saving = false));
    },
    next() {
      this.$emit("next");
    },
  }
};
</script>
<style>
div.a-result.col-md-6.col-12 {
  padding-bottom: 0px;
  /* margin-left: 5px; */
}
.single-doctor {
  padding: 10px;
}
.contact-doc {
  color: #26c6da;
  font-size: 20px;
  margin-left: 40px;
  margin-top: 0px;
  padding-bottom: 0px;
}
.contact-divider {
  margin-left: 30px;
  margin-top: 0px;
}
div.v-subheader.title {
  padding: 0 !important;
  margin-top: 20px;
}
.background-color-chat {
  background-color: #1e3354;
}
.call {
  padding: 5px;
}
.content {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.v-list-item--active {
  background-color: white !important;
}
.chat {
  padding: 5px;
}
.text-color {
  color: white;
}
.button-margin {
  margin: 7px;
}
</style>
