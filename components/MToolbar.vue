<template>
  <div>
    <v-app-bar app fixed color="white">
      <v-toolbar-title class="pt-2 mr-1">
        <span class="d-block mx-3">
          <NuxtLink style="text-decoration: none" to="/">
            <img
              :src="Logo"
              alt="Healthgear logo"
              height="30px"
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
  }
};
</script>

<style scoped></style>
