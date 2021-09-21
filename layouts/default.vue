<template>
  <v-app>
    <Toolbar v-if="!isMobile" />
    <MToolbar v-else />
    <v-main>
      <Nuxt />
    </v-main>
    <Footer />
    <Snackbar />
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    isMobile() {
      return !!this.$vuetify.breakpoint.smAndDown;
    }
  }
};
</script>

<style>
a {
  text-decoration: none !important;
}

.v-text-field--rounded {
  border-radius: 15px !important;
}

.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background: #ffffff !important;
}

.v-stepper.v-sheet.theme--light {
  box-shadow: 0px 0px 30px #02a2de2e !important;
  border-radius: 15px !important;
}
</style>
