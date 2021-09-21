<template>
  <!-- <div>
    <v-row no-gutters justify="center" class="mx-auto my-6">
      <v-col cols="12" md="9" id="a-result"
        ><span id="the-result" v-if="doctors.length != 0">
          <v-row justify="start">
            <div class="contact-doc">Recommendation</div>
          </v-row>

          <v-row justify="start" class="contact-divider"> <v-divider /> </v-row>
          <v-row justify="start">
            <div class="text-subtitle-1">
              Avoid stress for the time-being, eat lots of fruits, exercise well
              and drink lots of water.
            </div>
          </v-row>
          <v-row justify="start">
            <div class="text-body-1">
              To get more information, contact a doctor
            </div>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="11"
              v-for="(doctor, i) in doctors"
              :key="i"
              hide-actions
            >
              <v-row align="center" class="content single-doctor" no-gutters>
                <v-col class="doctor-details">
                  <div>
                    <v-avatar size="36px" class="doctor-avatar">
                      <img alt="Doctor Image" :src="doctor?.user.avatar" />
                    </v-avatar>
                  </div>
                  <div class="doctor-fullname">
                    <div class="font-weight-bold">
                      Dr {{ titleCase(doctor?.user.fullname) }}
                    </div>
                    <div>
                      {{
                        doctor?.services[0].name.charAt(0).toUpperCase() +
                          doctor?.services[0].name.slice(1)
                      }}
                      | {{ doctor?.location.state }}
                    </div>
                  </div>
                </v-col>

                <v-spacer />
                <v-col>
                  <v-btn depressed class="call button-margin">
                    <v-icon color="white"> mdi-message-outline</v-icon>
                    <span class="text-color">Chat</span>
                  </v-btn>

                  <v-btn depressed class="chat accent button-margin">
                    <v-icon color="white"> mdi-eye-outline</v-icon
                    ><span class="text-color">Call</span>
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider />
            </v-col>
          </v-row>
        </span>
        <v-row v-else>
          <v-col cols="12" md="9">
            <v-container
              ><v-row>
                <span class="font-weight-medium">
                  You do not have recommended doctor
                </span></v-row
              >
            </v-container></v-col
          >
        </v-row>
      </v-col></v-row
    >
  </div> -->
</template>

<script>
export default {
  // middleware: "authenticated",
  async asyncData({ $axios, res, error }) {
    try {
      const { data, status, statusText } = await $axios.get(
        "/v1/user/liked-doctors"
      );
      // console.log("docs:::::::::::", data.payload);
      return {
        doctors: data.payload.liked_doctors

        // specialities: data.payload.map((e) => e.specialites),
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  },
  data: () => ({
    doctors: [],
    specialites: []
  }),
  computed: {
    isDoctor() {
      return this.$store.state.user?.user.is_doctor
        ? this.$store.state.user?.user.is_doctor
        : false;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    titleCase(str) {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(" ");
    }
  }
  // async getServices() {
  //   try {
  //     const { data } = await this.$axios.get("v1/service");
  //     if (data.payload) {
  //       this.services = data.payload.map((e) => e.name);
  //     }
  //   } catch (e) {
  //     const response = e;
  //   }
  // },
};
</script>

<style>
div.a-doc.col.col-12 {
  padding-bottom: 0px;
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
