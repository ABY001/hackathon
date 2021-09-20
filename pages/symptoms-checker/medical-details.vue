<template>
  <v-container grid-list-md fluid>
    <v-subheader cols="12" class="title">Symptom Checker</v-subheader>
    <v-card flat>
      <v-col cols="12" md="6" class="a-result">
        <v-row justify="start">
          <div class="contact-doc">Enter Details</div>
        </v-row>
        <v-row justify="start" class="contact-divider"> <v-divider /> </v-row>
        <div style="margin-left:50px">
          <v-row>
            <v-col cols="12" md="6">
              <div class="font-weight-light">Age</div>
              <v-text-field
                v-model="age"
                :disabled="age != null"
                title="Age"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <div class="font-weight-light">Body Weight(kg)</div>
              <v-text-field
                type="number"
                v-model="user.weight"
                title="body-weight"
                outlined
                required
              ></v-text-field> </v-col></v-row
          ><v-row>
            <v-col cols="12" md="6">
              <div class="font-weight-light">Gender</div>
              <v-text-field
                v-model="user.gender"
                :disabled="user.gender != null"
                title="gender"
                outlined
                required
              /> </v-col
          ></v-row>
        </div>
      </v-col>
      <v-row justify="center" style="margin-top:60px">
        <v-col cols="10">
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-row justify="end">
            <v-btn
              large
              depressed
              color="primary"
              @click="processForm"
              :loading="saving"
              style="width:120px; height:50px"
              >Next</v-btn
            >
          </v-row>
        </v-col></v-row
      >
    </v-card>
  </v-container>
</template>
<script>
export default {
  // middleware: "authenticated",

  computed: {
    user() {
      return this.$store.state.user.user;
    },
    age() {
      const user = this.$store.state.user.user.date_of_birth;
      var today = new Date();
      var birthDate = new Date(user);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      // console.log("age", age);
      return [age];
    },
  },
  data() {
    // const user = this.$store.state.user.user;
    return {
      // age: null,
      weight: null,
      gender: null,
      saving: false,
      // user: [],
    };
  },

  methods: {
    processForm() {
      this.saving = true;

      const Data = {
        weight: this.user.weight,
      };
      this.$axios
        .put(`/v1/user/update/info`, Data)
        .then(({ data }) => {
          if (data.state === "OK") {
            this.$store.commit("snackbar/show", {
              text: "Medical Details information updated successfully",
              icon: "success",
            });
            this.$store.commit("user/setUser", { ...this.user, ...Data });
            this.$router.push(`/symptoms-checker/symptom-selection`);
          } else {
            this.$store.commit("snackbar/show", {
              text: data.message ? data.message : data.payload,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          const { response, message } = err;
          this.$store.commit("snackbar/show", {
            text: (response && response.statusText) || message,
            icon: "error",
          });
        })
        .finally(() => (this.saving = false));
    },
  },
};
</script>
<style>
/* .container {
  max-width: 1370px;
  margin: auto;
} */
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
