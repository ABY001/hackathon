<template>
  <v-container grid-list-md fluid>
    <v-subheader cols="12" class="title">Symptom Checker</v-subheader>
    <v-card flat>
      <v-col cols="12" md="8" class="a-result">
        <v-row justify="start">
          <div class="contact-doc">Enter Details</div>
        </v-row>
        <v-row justify="start" class="contact-divider"> <v-divider /> </v-row>
        <div style="margin-left:50px">
          <span v-if="questions.type">
            <v-row v-if="questions.type == 'single'">
              <v-col cols="12" md="12">
                <div class="font-weight-light">{{ questions.text }}</div>
                <v-radio-group v-model="fever">
                  <v-radio
                    v-for="(choice, i) in questions.items[0].choices"
                    :color="
                      choice.label == 'Yes'
                        ? 'success'
                        : choice.label == 'No'
                        ? 'error'
                        : 'secondary'
                    "
                    :key="i"
                    :items="choice"
                    :value="choice"
                    outlined
                  >
                    <template v-slot:label>
                      <div
                        :style="[
                          choice.label == 'Yes'
                            ? 'color: green'
                            : choice.label == 'No'
                            ? 'color: red'
                            : 'color: blue',
                        ]"
                      >
                        {{ choice.label }}
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>

              <v-btn
                large
                depressed
                :loading="loading"
                :disabled="!fever"
                color="primary"
                style="width:150px; height:50px"
                @click="parseSuggestions"
                >Next question</v-btn
              >
            </v-row>
            <v-row v-else-if="questions.type == 'group_single'">
              <v-col cols="12" md="12">
                <div class="font-weight-light">
                  {{ questions.text }}
                </div> </v-col
              ><v-col cols="12" md="12">
                <v-row justify="space-between">
                  <v-radio-group
                    style="width:50%"
                    v-model="fever"
                    v-for="(item, i) in questions.items"
                    :key="i"
                  >
                    <div class="font-weight-light">{{ item.name }}</div>
                    <v-radio
                      v-for="(choice, i) in item.choices"
                      :color="
                        choice.label == 'Yes'
                          ? 'success'
                          : choice.label == 'No'
                          ? 'error'
                          : 'secondary'
                      "
                      :key="i"
                      :items="choice"
                      :value="choice"
                      outlined
                    >
                      <template v-slot:label>
                        <div
                          :style="[
                            choice.label == 'Yes'
                              ? 'color: green'
                              : choice.label == 'No'
                              ? 'color: red'
                              : 'color: blue',
                          ]"
                        >
                          {{ choice.label }}
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group></v-row
                >
              </v-col>
              <v-btn
                large
                depressed
                :disabled="!fever"
                color="primary"
                style="width:150px; height:50px"
                @click="parseSuggestionsMultiple"
                >Next question</v-btn
              >
            </v-row>
            <v-row v-else-if="questions.type == 'group_multiple'">
              <v-col cols="12" md="9">
                <div class="font-weight-light">{{ questions.text }}</div>
              </v-col>

              <v-col cols="12" md="12">
                <v-row justify="space-between">
                  <v-radio-group
                    style="width:50%"
                    v-model="fever"
                    v-for="(item, i) in questions.items"
                    :key="i"
                    :value="item.id"
                  >
                    <ul class="font-weight-light">
                      <li>
                        {{ item.name }}
                      </li>
                    </ul>
                    <v-radio
                      v-for="(choice, i) in item.choices"
                      :color="
                        choice.label == 'Yes'
                          ? 'success'
                          : choice.label == 'No'
                          ? 'error'
                          : 'secondary'
                      "
                      :key="i"
                      :items="choice"
                      :value="choice"
                      outlined
                    >
                      <template v-slot:label>
                        <div
                          :style="[
                            choice.label == 'Yes'
                              ? 'color: green'
                              : choice.label == 'No'
                              ? 'color: red'
                              : 'color: blue',
                          ]"
                        >
                          {{ choice.label }}
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group></v-row
                ></v-col
              >
              <v-row>
                <v-btn
                  large
                  depressed
                  :disabled="!fever"
                  color="primary"
                  style="width:150px; height:50px"
                  @click="parseSuggestionsMultiple"
                  >Next question</v-btn
                ></v-row
              >
            </v-row>
          </span>
          <v-row v-else-if="emptyQuestion">
            <v-col cols="12" md="9">
              <div class="font-weight-light">No more question</div>
            </v-col>
          </v-row>
          <!-- <v-row v-else>
            <v-col cols="12" md="9"
              ><div class="font-weight-light">
                You do not have any symptoms. pls tell kindly fill in your data
                <nuxt-link :to="`/symptoms-checker/medical-details`"
                  >here</nuxt-link
                >
              </div></v-col
            >
          </v-row> -->
        </div>

        <v-row v-if="questions == ''">
          <v-col cols="12">
            <v-container
              ><v-row style="margin: 0 20px">
                <span class="font-weight-medium">
                  No diagnostic question found
                </span></v-row
              >
            </v-container></v-col
          ></v-row
        >
      </v-col>
      <v-row justify="center" style="margin-top:60px">
        <v-col cols="12">
          <v-divider />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-row justify="center">
            <v-btn depressed text @click="goBack">
              <v-icon left>
                mdi-arrow-left
              </v-icon>
              Back </v-btn
            ><v-spacer />
            <v-btn
              large
              depressed
              color="primary"
              style="width:120px; height:50px"
              :to="`/symptoms-checker/result`"
              >Next</v-btn
            >
          </v-row>
        </v-col></v-row
      >
    </v-card>
  </v-container>
</template>
<script>
import InfermedicaApi from "~/plugins/infermedica-api";
export default {
  // middleware: "authenticated",

  data() {
    const user = this.$store.state.user.user;
    // const questions = this.$store.state.evidence.mentions.question;
    return {
      fever: null,
      symptoms: null,
      dizzy: null,
      appetite: null,
      loading: false,
      emptyQuestion: false,
      // items: [],
    };
  },

  computed: {
    questions() {
      // console.log(
      //   "questions",
      //   this.$store.state.evidence.mentions.res.question
      // );
      return this.$store.state.evidence.mentions.length != 0 &&
        this.$store.state.evidence.mentions.res.question != null
        ? this.$store.state.evidence.mentions.res.question
        : "";
    },

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
      return age;
    },
    items() {
      console.log(
        "items",
        this.$store.state.evidence.mentions.res.question.items[0].choices.map(
          (e) => e.label
        )
      );
      return this.$store.state.evidence.mentions.res.question.items[0].choices.map(
        (e) => e.label
      );
    },
  },

  watch: {
    // fever: {
    //   immediate: false,
    //   handler(update) {
    //     this.getFever();
    //   },
    //   deep: true,
    // },
  },

  methods: {
    getfever() {
      return this.fever ? console.log("fever", fever) : "";
    },
    goBack() {
      this.$router.go(-1);
    },
    async parseSuggestions() {
      this.loading = true;
      // const url = `parse`;
      const url2 = `diagnosis`;
      this.api = new InfermedicaApi();
      const data2 = {
        sex: this.user.gender.toLowerCase(),
        age: {
          value: this.age,
        },
        evidence: [
          {
            id: this.questions.items[0].id,
            choice_id: this.fever.id,
          },
        ],
        extras: {
          enable_triage_3: true,
          disable_groups: true,
          enable_explanations: true,
        },
      };
      var diagnose = JSON.stringify(data2);
      console.log("sec::::::::", diagnose);

      this.api.post(url2, diagnose).then((res) => {
        if (res) {
          console.log("questions::::::", res);
          if (res.question != null) {
            this.$store.commit("snackbar/show", {
              text: "Next Question generated successfully",
              icon: "success",
            });
            this.$store.commit("evidence/setMentions", { res });
          } else {
            this.$router.push(`/symptoms-checker/result`);
            this.$store.commit("snackbar/show", {
              text: "Diagnosis generated successfully",
              icon: "success",
            });
            this.emptyQuestion = true;
          }
        }
        this.fever = null;
        this.loading = false;
      });
    },
    async parseSuggestionsMultiple() {
      this.loading = true;
      // const url = `parse`;
      const url2 = `diagnosis`;
      this.api = new InfermedicaApi();
      const data2 = {
        sex: this.user.gender.toLowerCase(),
        age: {
          value: this.age,
        },
        evidence: [
          {
            id: this.questions.items.item.id,
            choice_id: this.fever.id,
          },
        ],
        extras: { enable_triage_3: true },
      };
      var diagnose = JSON.stringify(data2);
      console.log("sec::::::::", diagnose);

      this.api.post(url2, diagnose).then((res) => {
        if (res) {
          console.log("questions::::::", res);
          this.$store.commit("snackbar/show", {
            text: "Next Question generated successfully",
            icon: "success",
          });
          this.$store.commit("evidence/setMentions", { res });
        }
      });
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
