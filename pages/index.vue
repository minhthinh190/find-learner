<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row
      justify="space-between"
      class="px-md-16"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="pr-md-10"
      >
        <div>
          <h1 class="pb-4">
            Lorem ipsum dolor sit amet
          </h1>
          <p class="pb-4">
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum.
          </p>

          <nuxt-link
            to="/connect"
            class="link"
          >
            <v-btn
              color="teal darken-1"
              depressed
              class="pa-5 white--text"
            >
              Let's Connect
            </v-btn>
          </nuxt-link>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        class="pl-md-10"
      >
        <div>
          <img
            src="~/assets/images/cover_image.jpg"
            alt="cover image"
            class="cover-image"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    AppBar
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.link {
  text-decoration: none;
}
.inside-box {
  border: 1px solid blue;
}
.cover-image {
  width: 100%;
}
</style>
