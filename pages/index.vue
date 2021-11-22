<template>
  <v-container fluid class="pa-sm-16 root-container">
    <v-row
      justify="space-between"
      class="mb-16 px-md-16"
    >
      <v-col cols="12">
        <div class="text-center">
          <h1>Lorem ipsum dolor sit amet</h1>
        </div>

        <v-spacer class="my-6"/>

        <!-- Filter & Search Bar -->
        <v-container fluid class="px-2 py-0">
          <v-sheet class="px-5 py-4">
            <v-row justify="space-between">
              <v-col cols="2" class="px-2 py-0">
                <v-select
                  label="Subject"
                  color="teal darken-1"
                  background-color="grey lighten-4"
                  :items="subjects"
                  solo
                  dense
                  flat
                  hide-details
                  class="my-3"
                ></v-select>
              </v-col>

              <v-col cols="4" class="px-2">
                <v-container class="pa-0 d-flex">
                  <v-text-field
                    label="Find by ID"
                    color="teal accent-4"
                    dense
                    outlined
                    hide-details
                  ></v-text-field>

                  <div>
                    <v-btn
                      height="100%"
                      dark
                      depressed
                      color="teal darken-1"
                      class="ml-2"
                    >
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </div>
                </v-container>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>

        <v-spacer class="my-2"/>

        <!-- Request Card Container -->
        <v-container fluid>
          <v-row v-if="paginatedRequests.length">
            <v-col
              v-for="(request, index) in paginatedRequests[page - 1]"
              :key="index"
              cols="3"
              class="pa-2"
            >
              <v-card tile elevation="0">
                <v-card-subtitle class="py-2">
                  <div class="d-flex justify-space-between">
                    <p class="ma-0 request-id">
                      <strong>1002</strong>
                    </p>
                    <p class="ma-0">{{ request.createdDate }}</p>
                  </div>
                </v-card-subtitle>

                <v-divider class="mx-4 my-0"/>

                <v-card-text class="py-3 card-text">
                  <p class="ma-0">
                    <strong>Subject: </strong>{{ request.subject }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Format: </strong>{{ request.format }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Address: </strong>{{ request.address }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Time: </strong>{{ request.time }}
                  </p>
                </v-card-text>

                <v-card-actions class="px-4">
                  <v-spacer />
                  <v-btn
                    text
                    color="teal darken-1"
                    class="text-capitalize"
                  >
                    Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else class="pa-16">
            <v-col cols="12" class="text-center my-16 pa-16">
              <v-progress-circular
                :size="50"
                :width="5"
                indeterminate
                color="teal accent-4"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>

        <!-- Pagination -->
        <v-container fluid v-if="paginatedRequests.length">
          <v-row>
            <v-col cols="12" class="px-2">
              <v-pagination
                v-model="page"
                color="teal darken-1"
                :length="paginatedRequests.length"
                :total-visible="7"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      subjects: [
        'All',
        'Math',
        'English',
        'Literature',
        'Physics',
        'Chemistry',
        'Biology',
        'IELTS',
        'TOEIC'
      ],
      page: 1,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      paginatedRequests: 'request/paginatedRequestList'
    })
  },
  async mounted () {
    this.showLoader()
    await this.$store.dispatch('request/getRequests')
    this.hideLoader()
    this.$store.dispatch('request/paginateRequestList')
  },
  methods: {
    showLoader () {
      this.isLoading = true
    },

    hideLoader () {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.request-id {
  color: #00BFA5;
}
.card-text {
  font-size: 15px;
}
</style>
