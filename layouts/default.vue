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

<style scoped></style>
