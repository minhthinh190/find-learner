<template>
  <v-footer padless>
    <v-card
      flat
      tile
      dark
      width="100%"
      color="teal darken-4"
      class="px-md-16"
    >
      <v-card-text class="white--text">
        <v-row class="py-4">
          <v-col cols="4">
            <h2 class="mb-4">Find Learner</h2>
            <!--
            <p>
              Dribbble is the world’s leading community for creatives to share, grow, and get hired.
              Lorem ipsum dolor sit amet lorem ipsum dolor sit amet.
            </p>
            -->
            <p class="ma-0">
              Hotline: <b>19001000</b>
            </p>
            <p class="ma-0">Email: help@findtutor.com</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        <p class="ma-0">Address: 52 UT Street, TB Square, New York City</p>
        <p class="ma-0">Lorem ipsum dolor sit amet consectetur adipisicing elit, libero eos ipsam facilis numquam est.</p>
        <p class="ma-0">Consequuntur facilis, inventore quas at ab ipsam quo vel cum, impedit asperiores sunt eos minima dicta.</p>
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        &copy; 2021 Find Tutor. All rights reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.link-container {
  display: inline;
}
.link-container p {
  display: inline;
}
.link {
  display: inline-block;
  color: #757575;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
