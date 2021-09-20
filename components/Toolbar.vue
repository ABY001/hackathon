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
      <v-btn
        text
        x-large
        class="mx-0 font-weight-bold navbar-nav"
        active-class="toolbar-link--active"
      >
        Symptoms checker
      </v-btn>
      <v-btn
        text
        x-large
        class="mx-0 font-weight-bold navbar-nav"
        active-class="toolbar-link--active"
      >
        COVID Response
      </v-btn>
      <v-spacer />
      <v-icon color="#F1F1F1">
        mdi-bell
      </v-icon>
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

<style scoped>
.toolbar-link--active {
  background-color: #33b47f !important;
  border-radius: 0px 0px 20px 20px !important;
  opacity: 1;
}
.navbar-nav {
  border-radius: 0px 0px 20px 20px !important;
  opacity: 1;
  /* color: #fcfcfc; */
}
</style>
