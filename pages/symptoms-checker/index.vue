<template
  ><v-container>
    <v-stepper v-model="e1">
      <v-stepper-header class="mt-4">
        <v-stepper-step :complete="e1 > 1" step="1">
          Medical Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Symptom Selection
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Diagnostic Questions
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          Results
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="5">
          Recommendation
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="lighten-1">
            <medical-details />
          </v-card>
          <v-row no-gutters justify="center" class="mx-auto">
            <v-col cols="12" md="9">
              <v-btn
                color="#33B47F"
                @click="e1 = 2"
                height="61px"
                class="continue-btn"
                block
                large
              >
                <span class="white--text">Next</span>
              </v-btn>
            </v-col></v-row
          >
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="lighten-1">
            <symptom-selection />
          </v-card>
          <v-row no-gutters justify="center" class="mx-auto">
            <v-col cols="12" md="9">
              <v-btn
                color="#33B47F"
                @click="e1 = 3"
                height="61px"
                class="continue-btn"
                block
                large
              >
                <span class="white--text">Next</span>
              </v-btn>
            </v-col></v-row
          >
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="lighten-1">
            <diagnostic-question />
          </v-card>
          <v-row no-gutters justify="center" class="mx-auto">
            <v-col cols="12" md="9">
              <v-btn
                color="#33B47F"
                @click="e1 = 4"
                height="61px"
                class="continue-btn"
                block
                large
              >
                <span class="white--text">Next</span>
              </v-btn>
            </v-col></v-row
          >
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" color="lighten-1">
            <result />
          </v-card>
          <v-row no-gutters justify="center" class="mx-auto">
            <v-col cols="12" md="9">
              <v-btn
                color="#33B47F"
                @click="e1 = 4"
                height="61px"
                class="continue-btn"
                block
                large
              >
                <span class="white--text">Next</span>
              </v-btn>
            </v-col></v-row
          >
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" color="lighten-1">
            <recommendation />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import DiagnosticQuestion from "../../components/symptoms/diagnostic-question.vue";
import medicalDetails from "../../components/symptoms/medical-details.vue";
import Recommendation from "../../components/symptoms/recommendation.vue";
import Result from "../../components/symptoms/result.vue";
import SymptomSelection from "../../components/symptoms/symptom-selection.vue";
export default {
  components: {
    medicalDetails,
    SymptomSelection,
    DiagnosticQuestion,
    Result,
    Recommendation
  },
  data() {
    return {
      e1: 1
    };
  }
};
</script>

<style>
span.v-stepper__step__step.primary {
  background-color: #02a2de !important;
  border-color: #02a2de !important;
}
.continue-btn {
  box-shadow: 0px 0px 30px #02a2de2e;
  border-radius: 15px;
  opacity: 1;
}
</style>
