<template>
  <v-container
    v-if="request"
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <v-col
        cols="12"
        md="3"
        class="pr-md-3 pa-0"
      >
        <v-container
          fluid
          class="pa-0"
        >
          <v-card-title class="px-0 pt-0 pb-4">
            <v-avatar
              color="grey lighten-2"
            ></v-avatar>

            <h4 class="ml-3">{{ tutor ? tutor.name : '' }}</h4>
          </v-card-title>
          
          <div class="px-4 py-2 nav-item">
            <v-icon class="mr-3">
              mdi-account
            </v-icon>

            <nuxt-link to="" class="nav-link">
              My profile
            </nuxt-link>
          </div>

          <div class="px-4 py-2 nav-item">
            <v-icon class="mr-3">
              mdi-bell
            </v-icon>

            <nuxt-link to="" class="nav-link">
              Notifications
            </nuxt-link>
          </div>
        </v-container>
      </v-col>

      <v-col
        cols="12"
        md="9"
        class="pl-md-3 pa-0"
      >
        <v-container fluid class="">
          <v-row class="mb-4">
            <v-col cols="6">
              <v-chip
                color="primary"
                outlined
                small
              >
                {{ capitalizeFirstLetter(request.status) }}
              </v-chip>
            </v-col>

            <v-col cols="6">
              <p class="ma-0 text-right subtitle-2 created-date">
                Created date: {{ request.createdDate }}
              </p>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-sheet
                color="white"
                height="50"
                class="px-4 py-3 v-sheet--custom"
              >
                <p>
                  <span class="font-weight-bold">
                    Tutor:&nbsp;
                  </span>

                  <nuxt-link
                    v-for="(tutor, index) in request.tutors"
                    :key="index"
                    to=""
                    class="link"
                  >
                    {{ tutor }}
                    <span
                      v-if="index !== request.tutors.length - 1"
                      class="comma"
                    >
                      ,&nbsp;
                    </span>
                  </nuxt-link>
                </p>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="generateDetailsTableData()"
                hide-default-footer
                class="v-table--custom"
              ></v-data-table>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-card flat tile>
                <div class="px-4 pt-4 pb-0">
                  <p class="ma-0 font-weight-bold">
                    Description
                  </p>
                </div>

                <v-card-text class="pt-2">
                  {{ request.description }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-sheet
                color="white"
                height="50"
                class="px-4 py-3 v-sheet--custom"
              >
                <p>
                  <span class="font-weight-bold">
                    Address:&nbsp;
                  </span>
                  {{ request.address }}
                </p>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12">
              <v-sheet
                color="white"
                height="50"
                class="px-4 py-3 v-sheet--custom"
              >
                <p>
                  <span class="font-weight-bold">
                    Contact:&nbsp;
                  </span>
                  {{ request.contact }}
                </p>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn
                color="teal darken-1"
                depressed
                class="px-6 text-capitalize white--text"
                @click.stop="isDialogShowed = true"
              >
                Apply
              </v-btn>
            </v-col>
          </v-row>

          <confirm-dialog
            :isDialogShowed="isDialogShowed"
            v-on:close-dialog="isDialogShowed = false"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ConfirmDialog from '~/components/ConfirmDialog'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    ConfirmDialog
  },
  data () {
    return {
      isDialogShowed: false,
      headers: [
        { text: 'Subject', value: 'subject', align: 'start', sortable: false },
        { text: 'Format', value: 'format', align: 'start', sortable: false },
        { text: 'Time', value: 'time', align: 'start', sortable: false },
        { text: 'Per week', value: 'perWeek', align: 'start', sortable: false },
        { text: 'Duration', value: 'duration', align: 'start', sortable: false }
      ]
    }
  },
  computed: {
    requestId () {
      return this.$route.params.id
    },
    requestOwner () {
      return this.$route.params.owner
    },
    ...mapState({
      tutor: state => state.user.profile,
      request: state => state.request.request
    }),
  },
  created () {
    const id = this.requestId
    const userEmail = this.requestOwner

    this.$store.dispatch('request/getRequestById', {
      userEmail,
      id
    })
    this.$store.dispatch('user/getUserProfile')
  },
  methods: {
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    generateDetailsTableData () {
      const data = [
        {
          subject: this.capitalizeFirstLetter(this.request.subject),
          format: this.request.format,
          time: this.request.time,
          perWeek: this.request.perWeek,
          duration: this.request.duration + ' (mins)'
        }
      ]
      return data
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.col {
  padding: 0;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
.comma {
  color: black;
}
.nav-item:hover {
  cursor: pointer;
  background: #EEEEEE;
}
.nav-item:hover .nav-link {
  color: black;
}
.nav-link {
  color: #757575;
  text-decoration: none;
}
.created-date {
  font-weight: normal;
  color: #757575;
}
</style>

<style>
.v-table--custom thead tr {
  background: white;
}
.v-table--custom thead th {
  font-size: 15px !important;
  color: #000000 !important;
}
.v-table--custom tbody tr {
  background: white;
}
.v-table--custom tbody tr:hover {
  background: transparent !important;
}
</style>
