<template>
  <div>
    <v-card class="mb-12" color="lighten-1">
      <v-row no-gutters justify="center" class="mx-auto">
        <v-col cols="12" md="9">
          <div class="text-h5 my-2" style="color: #02A2DE">
            Add your symptoms
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <v-divider />
        </v-col>
        <v-col cols="12" md="9">
          <div class="text-subtitle-1 my-2">Search for symptoms</div>
        </v-col>
        <v-col cols="12" md="9">
          <v-autocomplete
            v-model="newTag"
            :loading="loading"
            :items="items"
            item-text="name"
            :search-input.sync="search"
            flat
            chips
            multiple
            outlined
            light
            item-value="API"
            clearable
            return-object
            color="#02A2DE"
            hide-no-data
            hide-details
            placeholder="Search e.g. Headache"
            filled
            class="search-icon my-3"
            append-icon="mdi-magnify"
            style="box-shadow: 0px 0px 16px #02A2DE36; border-radius: 15px;"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click:close="remove(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="9">
          <div class="tip-box">
            <div
              class="font-weight-light"
              style="margin:30px 10px; padding 30px"
            >
              <div style="font-weight:500; padding-bottom:15px">
                You can add more than one symptoms
              </div>
              <li v-for="newTags in newTag" :key="newTags.id">
                {{ newTags.name }}
              </li>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-row no-gutters justify="center" class="mx-auto">
      <v-col cols="12" md="9">
        <v-btn
          color="#33B47F"
          @click="next"
          :loading="loading"
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
import InfermedicaApi from "~/plugins/infermedica-api";
export default {
  // middleware: "authenticated",

  data() {
    const user = this.$store.state.user.user;
    return {
      fever: null,
      symptoms: null,
      dizzy: null,
      appetite: null,
      select: null,
      loading: false,
      items: [],
      symptoms: [],
      queryTerm: null,
      newTag: null,
      isLoading: false,
      newTags: []
    };
  },
  computed: {
    search: {
      get() {
        this.isLoading = true;
        this.fetchSuggestion();
        return this.queryTerm;
        this.isLoading = false;
      },
      set(searchInput) {
        if (this.queryTerm !== searchInput) {
          this.isLoading = true;
          this.queryTerm = searchInput;

          this.isLoading = false;
        }
      }
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
    }
  },
  methods: {
    next() {
      this.$emit("next");
    },
    remove(item) {
      const index = this.newTag.indexOf(item);
      if (index >= 0) this.newTag.splice(index, 1);
    },
    async parseSuggestions() {
      this.loading = true;
      if (this.newTag.length > 0) {
        const url = `parse`;
        const url2 = `diagnosis`;
        const queryName = this.newTag.map(e => e.name);
        const queryNames = queryName.join(", ");
        // var queryNames = JSON.stringify(queryName);
        const datat = { text: queryNames, age: { value: this.age } };
        var data = JSON.stringify(datat);
        this.api = new InfermedicaApi();
        const sypmtomResult = await this.api.post(url, data);
        console.log("oneoneone::::::::::", sypmtomResult);

        sypmtomResult.mentions.forEach(function(entry) {
          delete entry.common_name;
          delete entry.name;
          delete entry.orth;
          delete entry.type;
        });
        sypmtomResult.mentions[0].source = "initial";
        const data2 = {
          sex: this.user.gender.toLowerCase(),
          age: {
            value: this.age
          },
          evidence: sypmtomResult.mentions,
          extras: {
            enable_triage_3: true,
            disable_groups: true,
            enable_explanations: true
          }
        };
        var diagnose = JSON.stringify(data2);
        console.log("sec::::::::", diagnose);

        this.api.post(url2, diagnose).then(res => {
          if (res) {
            console.log("questions::::::", res);
            this.$store.commit("snackbar/show", {
              text: "Symptoms stored successfully",
              icon: "success"
            });
            this.$store.commit("evidence/setMentions", { res });
          }
        });
      }
      setTimeout(() => {
        this.loading = false;
        this.$router.push(`/symptoms-checker/diagnostic-question`);
      }, 2000);
    },
    async fetchSuggestion() {
      const url2 = `concepts?types=symptom&name=` + this.queryTerm;
      this.api = new InfermedicaApi();
      const entry2 = await this.api.get(url2);
      this.items = entry2;
      // this.items = entry2.map((e) => e.name);
    },
    goBack() {
      this.$router.go(-1);
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    genQuestions() {
      this.loading = true;
      this.$axios
        .post({
          sex: this.user.gender,
          age: {
            value: this.age
          },
          evidence: [
            {
              id: "s_1193",
              choice_id: "present",
              source: "initial"
            },
            {
              id: "s_488",
              choice_id: "present"
            },
            {
              id: "s_418",
              choice_id: "present"
            }
          ]
        })
        .then(data => {
          if (data.state === "OK") {
            this.$store.commit("snackbar/show", {
              text: data.message,
              icon: "success"
            });
            this.$router.push(`/admin/products/${rdata.payload._id}`);
          } else {
            this.$store.commit("snackbar/show", {
              text: data.message ? data.message : data.payload,
              icon: "error"
            });
          }
        })
        .catch(err => {
          const { response } = err;
          this.$store.commit("snackbar/show", {
            text: (response.data && response.data.message) || "Network error",
            icon: "error"
          });
        })
        .finally(() => {
          this.loading = false;
          this.clearFields();
        });
    }
  },
  mounted() {
    // this.playaround();
  }
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
.theme--light.v-chip:not(.v-chip--active) {
  background-color: #26c6da;
}
.single-doctor {
  padding: 10px;
}
div.v-input__icon.v-input__icon--append {
  color: #26c6da;
}
.tip-box {
  height: auto;
  min-height: 200px;
  width: 100%;
  background: #ffffff;
  border: 0.5px solid #02a2de;
  border-radius: 20px;
  margin-bottom: 45px;
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
