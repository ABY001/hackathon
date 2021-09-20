import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

const vuetify = new Vuetify({
  iconfont: "mdi",
  theme: {
    themes: {
      light: {
        primary: "#02A2DE",
        text: "#707070",
        input: "#ECF7FD",
        faded: "#F1F1F1",
        secondary: "#33B47F",
        header: "#000029",
        footer: "#393E6A",
        black: "#000000",
        white: "#FFFFFF",
        grey: "#8F8B8B",
        lightPurple: "#F8F7FC",
        revBlack: "#333333",
      },
    },
  },
})

export default vuetify
