<template>
  <v-app>
    <v-main>
      <AppBar />
      <Nuxt />
      <Footer />
    </v-main>

    <v-snackbar
      v-model="isNotiShowed"
      :color="notiColor"
      text
    >
      {{ notiMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          icon
          :color="notiColor"
          @click="isNotiShowed = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '~/components/AppBar'
import Footer from '~/components/Footer'

export default {
  components: {
    AppBar,
    Footer
  },
  data () {
    return {
      isNotiShowed: false
    }
  },
  computed: mapState({
    notiMessage: state => state.notification.message,
    notiColor: state => state.notification.color
  }),
  created () {
    this.$store.subscribe((mutations, state) => {
      if (mutations.type === 'notification/setNotification') {
        this.isNotiShowed = false
        this.isNotiShowed = true
      }
    })
  }
}
</script>

<style>
.root-container {
  background: #F5F5F5;
}
</style>
