<template>
  <div>
    <v-app-bar app color="white" class="hidden-sm-and-down">
      <v-toolbar-title class="pt-2 mr-1">
        <span class="d-block mx-3">
          <NuxtLink style="text-decoration: none" to="/">
            <img
              :src="Logo"
              alt="Healthgear logo"
              height="42px"
              class="text-uppercase primary--text"
          /></NuxtLink>
        </span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "@/assets/img/logo.png";
export default {
  data() {
    return {
      Logo
    };
  },
  methods: {}
};
</script>

<style scoped></style>
