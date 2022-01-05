<template>
  <v-container
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
            >
              <v-img :src="tutor.avatar"/>
            </v-avatar>

            <h4 class="ml-3">{{ tutor ? tutor.name : '' }}</h4>
          </v-card-title>
          
          <div class="py-2 nav-item">
            <v-icon class="mr-2">
              mdi-account
            </v-icon>

            <nuxt-link to="/my-account" class="nav-link">
              Tài khoản của tôi
            </nuxt-link>
          </div>

          <!--
          <div class="py-2 nav-item">
            <v-icon class="mr-2">
              mdi-bell
            </v-icon>

            <nuxt-link to="" class="nav-link">
              Thông báo
            </nuxt-link>
          </div>
          -->
        </v-container>
      </v-col>

      <v-col
        cols="12"
        md="9"
        class="pa-0"
      >
        <!-- Filter -->
        <v-tabs
          v-model="currentFilter"
          fixed-tabs
          color="teal darken-1"
          class="mb-4"
        >
          <v-tab
            v-for="item in vnFilters"
            :key="item"
            class="text-capitalize"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <!-- Loader -->
         <v-container v-if="isLoading" fluid class="py-0">
          <v-row>
            <v-col class="px-0">
              <div
                v-for="n in 3"
                :key="n"
              >
                <v-skeleton-loader
                  type="card"
                  class="v-skeleton-loader--custom"
                ></v-skeleton-loader>
                <v-spacer class="my-6"/>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <!-- No Classes Msg -->
        <v-container
          v-if="classList === null || !classList.length"
          fluid
          class="py-0"
        >
          <v-row>
            <v-col
              cols="12"
              class="px-0"
            >
              <v-card
                elevation="0"
                class="py-6"
              >
                <v-card-title class="py-16">
                  <v-row
                    justify="center"
                    class="py-10"
                  >
                    <v-col
                      cols="12"
                      class="d-flex justify-center"
                    >  
                      <img
                        src="~/assets/images/books.jpg"
                        class="image"
                      />
                    </v-col>
                    Bạn chưa có lớp nào.
                  </v-row>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Classes List -->
        <div v-if="!isLoading" class="mb-16 pb-16">
          <v-container
            v-for="(item, index) in classList"
            :key="index"
            fluid
            class="mb-2 py-0"
          >
            <v-row>
              <v-col
                cols="12"
                class="px-0"
              >
                <v-card flat tile outlined>
                  <v-card-title>
                    <nuxt-link
                      :to="{ name: 'class-id', params: {
                        id: item.id,
                        learner: item.email
                      }}"
                      class="link"
                    >
                      {{ item.id }}
                    </nuxt-link>

                    <v-spacer />

                    <p class="ma-0 subtitle-1 text--disabled">
                      {{ item.createdDate }}
                    </p>
                  </v-card-title>

                  <v-card-subtitle class="mb-2 pt-1 pb-0">
                    {{ formatSubjectName(item.subject) }}
                  </v-card-subtitle>

                  <v-card-text
                    class="ml-4 mb-4 px-2 py-0 font-weight-bold status-label"
                    :class="{
                      'status-label--responding': item.status === 'responding',
                      'status-label--applying': item.status === 'waiting',
                      'status-label--on-going': item.status === 'on-going',
                      'status-label--finished': item.status === 'finished'
                    }"
                  >
                    {{ translateBookingStatus(item.status) }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
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
      isLoading: false,
      vnFilters: ['Tất cả', 'Đã hoàn thành', 'Đang tiến hành', 'Đang ứng tuyển', 'Chờ phản hồi'],
      filters: ['All', 'Finished', 'On-going', 'Applying', 'Responding'],
      currentFilter: 0
    }
  },
  computed: {
    ...mapGetters({
      tutor: 'user/userProfile',
      classList: 'class/classList'
    })
  },
  watch: {
    currentFilter (val) {
      this.filterClassList(val)
    }
  },
  async mounted () {
    this.isLoading = true
    await this.$store.dispatch('class/getClassList')
    await this.$store.dispatch('user/getUserProfile')
    this.isLoading = false
  },
  methods: {
    async filterClassList (optionId) {
      this.isLoading = true
      const status = this.filters[optionId].toLowerCase()

      if (status === 'all') {
        await this.$store.dispatch('class/getClassList')
        this.isLoading = false
      } else {
        await this.$store.dispatch('class/getClassListByStatus', status)
        this.isLoading = false
      }
    },

    formatSubjectName (subjectName) {
      let formattedSubjectName = subjectName
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

      return formattedSubjectName
    },

    translateBookingStatus (originalStatus) {
      let status = ''

      switch (originalStatus) {
        case 'waiting':
          status = 'Đang ứng tuyển'
          break
        case 'responding':
          status = 'Chờ phản hồi'
          break
        case 'on-going':
          status = 'Đang tiến hành'
          break
        case 'finished':
          status = 'Hoàn thành'
          break
      }

      return status
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
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
}
.nav-item:hover .nav-link {
  color: black;
}
.nav-link {
  color: #757575;
  text-decoration: none;
}
.image {
  width: 150px;
}
.status-label {
  width: fit-content;
  font-size: 13px;
  font-weight: bold;
  color: #263238;
}
.status-label--responding {
  background: #FFF59D;
}
.status-label--applying {
  background: #E57373;
}
.status-label--on-going {
  background: #E6EE9C;
}
.status-label--finished {
  background: #80CBC4;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>
