<template>
  <v-row>
    <v-col cols="12" class="pa-0 relative">
      <v-sheet tile>
        <v-carousel
          cycle
          :show-arrows="false"
          hide-delimiters
          height="300px"
          class="elevation-0"
        >
          <v-carousel-item
            :src="banner"
            alt="banner"
            class="grey lighten-3"
          ></v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-col>
    <v-col cols="12" class="pa-0 relative white" style="z-index: 1">
      <v-container style="margin-top: -58px">
        <v-sheet color="white">
          <v-col cols="12" class="px-0 mb-9">
            <v-row justify="center" align="center" class="ma-0">
              <v-col cols="12" md="3">
                <v-card>
                  <v-card-title>
                    {{ covid.title }}
                  </v-card-title>
                  <v-card-text>
                    {{ covid.number }}
                  </v-card-text>
                  <v-card-subtitle>
                    {{ covid.new }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ covid.number2 }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card>
                  <v-card-title>
                    {{ covid.title }}
                  </v-card-title>
                  <v-card-text>
                    {{ covid.number }}
                  </v-card-text>
                  <v-card-subtitle>
                    {{ covid.new }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ covid.number2 }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card>
                  <v-card-title>
                    {{ covid.title }}
                  </v-card-title>
                  <v-card-text>
                    {{ covid.number }}
                  </v-card-text>
                  <v-card-subtitle>
                    {{ covid.new }}
                  </v-card-subtitle>
                  <v-card-text>
                    {{ covid.number2 }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-sheet>
      </v-container></v-col
    >
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      covid: {
        title: "Countries with confirmed cases",
        number: "49,346,902",
        new: "New Cases",
        number2: "106,545"
      }
    };
  }
};
</script>

<style></style>
