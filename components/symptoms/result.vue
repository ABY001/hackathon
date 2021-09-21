<template>
  <div>
    <v-row no-gutters justify="center" class="mx-auto my-6">
      <v-col cols="12" md="9" id="a-result"
        ><span id="the-result" v-if="results.length != 0">
          <v-row justify="start">
            <div class="contact-doc">Results</div>
          </v-row>

          <v-row justify="start" class="contact-divider"> <v-divider /> </v-row>

          <v-row>
            <v-col
              cols="12"
              md="12"
              v-for="(result, i) in results"
              :key="i"
              hide-actions
            >
              <v-progress-linear
                :value="result.probability * 100"
                :color="
                  prob(result.probability) == 'LOW'
                    ? 'red'
                    : prob(result.probability) == 'MEDIUM'
                    ? 'yellow'
                    : 'green'
                "
                height="25"
              >
                <strong>{{ Math.ceil(result.probability * 100) }}%</strong>
              </v-progress-linear>

              <v-col cols="12">
                <v-row>
                  The probability of this being your condition is &nbsp;
                  <span class="font-weight-bold">
                    {{ prob(result.probability) }}</span
                  >
                </v-row>
                <v-row>
                  <div
                    class="condition-name font-weight-bold"
                    style="font-size:22px"
                  >
                    {{ result.name }}
                  </div>
                </v-row>
                <v-row>
                  <span class="condition-subname">
                    ({{ result.common_name }})</span
                  >
                </v-row></v-col
              >
            </v-col>
          </v-row>
        </span>
        <v-row v-else>
           <v-col cols="12" md="9">
            <v-container
              ><v-row >
                <span class="font-weight-medium">
                  No result found
                </span></v-row
              >
            </v-container></v-col
          >
        </v-row>
      </v-col></v-row
    >
  </div>
</template>

<script>
export default {
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
  computed: {
    isDoctor() {
      return this.$store.state.user.user.is_doctor
        ? this.$store.state.user.user.is_doctor
        : false;
    },
    results() {
      return this.$store.state.evidence?.mentions.res
        ? this.$store.state.evidence?.mentions.res.conditions
        : "";
    },
    probability() {
      console.log(
        "friend",
        Number(
          this.$store.state.evidence?.mentions.res.conditions.probability
        ) * 100
      );
      return this.$store.state.evidence?.mentions.res
        ? this.$store.state.evidence?.mentions.res.conditions.probability * 100
        : "";
      // result.probability * 100;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    prob(result) {
      return result < 0.33
        ? "LOW"
        : 0.33 < result > 0.66
        ? "MEDIUM"
        : 0.66 < result > 1.0
        ? "HIGH"
        : "";
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
    },
    capture() {
      this.$store.commit("snackbar/show", {
        text: "kindly take screenshot of your result",
        icon: "success"
      });
    }
    // capturee() {
    //   html2canvas(document.getElementById("the-result")).then((canvas) => {
    //     // document.body.appendChild(canvas);
    //     document.getElementById("output").appendChild(canvas);
    //   });
    //   this.$store.commit("snackbar/show", {
    //     text: "Kindly save your screenshot",
    //     icon: "success",
    //   });
    // },

    // takeshot() {
    //   let div = document.getElementById("photo");

    //   // Use the html2canvas
    //   // function to take a screenshot
    //   // and append it
    //   // to the output div
    //   html2canvas(div).then(function(canvas) {
    //     document.getElementById("output").appendChild(canvas);
    //   });
    // },
  },
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
  data: () => ({
    doctors: [],
    specialites: []
  })
};
</script>

<style>
div#a-result.col-md-6.col-12 {
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
