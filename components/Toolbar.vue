<template>
  <div>
    <v-app-bar app color="white" class="hidden-sm-and-down">
      <v-toolbar-title class="pt-2 ml-md-9">
        <span class="d-block mx-3">
          <NuxtLink style="text-decoration: none" to="/">
            <img
              :src="Logo"
              alt="Healthgear logo"
              height="28px"
              class="text-uppercase primary--text"
          /></NuxtLink>
        </span>
      </v-toolbar-title>
      <v-spacer />
      <NuxtLink :to="'/symptoms-checker'">
      <v-btn
        text
        class="ma-0 font-weight-bold text-subtitle-1 navbar-nav"
        active-class="toolbar-link--active"
      >
        Symptoms checker
      </v-btn>
      </NuxtLink>
      <NuxtLink :to="'/covid-response'">
      <v-btn
        text
        class="mx-0 font-weight-bold text-subtitle-1 navbar-nav"
        active-class="toolbar-link--active"
      >
        COVID Response
      </v-btn>
      </NuxtLink>
      <v-spacer />
      <v-icon color="#F1F1F1" class="mx-3">
        mdi-bell
      </v-icon>
      <!-- <v-spacer /> -->
      <v-avatar
        size="36"
        color="mx-4 mr-md-9"
        active-class="toolbar-link--active"
      >
        <img :src="User" style="background-color: #67D3A052" />
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "@/assets/img/logo.png";
import User from "@/assets/img/avatar.png";
export default {
  data() {
    return {
      Logo,
      User,
    };
  },
  methods: {}
};
</script>

<style scoped>
.toolbar-link--active.v-btn--active:before .v-btn--active:after {
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
