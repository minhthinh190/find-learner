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
              <!-- Filter -->
              <v-col cols="12" lg="2" sm="3" class="px-2 py-0">
                <v-select
                  v-model="subject"
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

              <!-- Search Bar -->
              <v-col cols="12" lg="4" md="4" sm="6" class="px-2">
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
          <v-row v-if="!isLoading && paginatedRequests.length">
            <v-col
              v-for="(request, index) in paginatedRequests[page - 1]"
              :key="index"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              xs="12"
              class="pa-2"
            >
              <v-card tile elevation="0">
                <v-card-subtitle class="py-2">
                  <div class="d-flex justify-space-between">
                    <p class="ma-0 request-id">
                      <strong>{{ request.id }}</strong>
                    </p>
                    <p class="ma-0">{{ request.createdDate }}</p>
                  </div>
                </v-card-subtitle>

                <v-divider class="mx-4 my-0"/>

                <v-card-text class="py-3 card-text">
                  <p class="ma-0">
                    <strong>Subject: </strong>{{ capitalizeFirstLetter(request.subject) }}
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
                  <nuxt-link
                    :to="{ name: 'request-id', params: {
                      id: request.id,
                      owner: request.email
                    }}"
                    class="link"
                  >
                    <v-btn
                      text
                      color="teal darken-1"
                      class="text-capitalize"
                    >
                      Details
                    </v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Pagination -->
        <v-container fluid v-if="!isLoading && paginatedRequests.length">
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

        <!-- Loader -->
        <v-container fluid v-if="isLoading">
          <v-row class="pa-lg-16 pa-md-10">
            <v-col cols="12" class="text-center my-lg-10 pa-16">
              <v-progress-circular
                :size="50"
                :width="5"
                indeterminate
                color="teal accent-4"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>

        <!-- No Requests Announcement -->
        <v-container fluid v-if="!isLoading && !paginatedRequests.length">
          <v-row class="pa-lg-16 pa-md-10">
            <v-col cols="12" class="text-center my-lg-10 pa-16">
              <h2>No requests</h2>
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
      isLoading: false,
      subject: 'All'
    }
  },
  computed: {
    ...mapGetters({
      paginatedRequests: 'request/paginatedRequestList'
    })
  },
  watch: {
    subject (val) {
      this.filterRequestsBySubject(val)
    },
    page () {
      this.showLoader()
      setTimeout(() => {
        this.hideLoader()
      }, 500)
    }
  },
  mounted () {
    this.filterRequestsBySubject(this.subject)
  },
  methods: {
    async filterRequestsBySubject (subject) {
      this.showLoader()
      await this.$store.dispatch('request/filterRequests', {
        subject: subject.toLowerCase()
      })
      this.hideLoader()

      this.$store.dispatch('request/paginateRequestList')
    },

    showLoader () {
      this.isLoading = true
    },

    hideLoader () {
      this.isLoading = false
    },

    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
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
.link {
  text-decoration: none;
}
</style>
