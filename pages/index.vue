<template>
  <v-container fluid class="pa-sm-16 root-container">
    <v-row
      justify="space-between"
      class="mb-16 px-md-16"
    >
      <v-col cols="12">
        <div class="text-center">
          <h1>Danh sách lớp cần gia sư</h1>
        </div>

        <v-spacer class="my-6"/>

        <!-- Filter & Search Bar -->
        <v-container fluid class="px-3 py-0">
          <v-row justify="space-between">
            <!-- Filter -->
            <v-col cols="12" lg="9" sm="4" class="px-2 pt-3 pb-0">
              <v-container fluid class="pa-0">
                <v-row>
                  <v-col cols="12" lg="2" sm="6" class="py-0">
                    <!-- Subject -->
                    <v-select
                      v-model="query.subject"
                      label="Môn học"
                      color="teal darken-1"
                      :items="subjects"
                      outlined
                      dense
                      hide-details
                      class="my-3 v-input--custom"
                    ></v-select>
                  </v-col>

                  <!-- Format -->
                  <!--
                  <v-col cols="12" lg="2" sm="6" class="py-0">
                    <v-select
                      v-model="query.format"
                      label="Hình thức"
                      color="teal darken-1"
                      :items="['Offline', 'Online', 'Offline & Online']"
                      outlined
                      dense
                      hide-details
                      class="my-3 v-input--custom"
                    ></v-select>
                  </v-col>
                  -->
                </v-row>
              </v-container>
            </v-col>

            <!-- Search Bar -->
            <v-col cols="12" lg="3" md="3" sm="6" class="px-2">
              <v-text-field
                v-model="queryStr"
                label="Tìm theo mã lớp"
                color="teal accent-4"
                prepend-inner-icon="mdi-magnify"
                dense
                outlined
                hide-details
                single-line
                class="v-input--custom"
                @keyup.enter="queryRequestsByQueryStr"
              ></v-text-field>
            </v-col>
          </v-row>
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
              <v-card outlined tile elevation="0">
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
                    <strong>Môn học: </strong>{{ capitalizeFirstLetter(request.subject) }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Hình thức: </strong>{{ request.format }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Địa chỉ: </strong>{{ request.address }}
                  </p>
                  <v-spacer class="mb-2"/>
                  <p class="ma-0">
                    <strong>Thời gian: </strong>{{ request.time }}
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
                      tile
                      text
                      color="teal darken-1"
                      class="text-capitalize"
                    >
                      Chi tiết
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
        <v-container fluid v-if="isLoading" class="py-0">
          <v-row>
            <v-col
              v-for="n in 12"
              :key="n"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              xs="12"
              class="px-2 py-0"
            >
              <v-skeleton-loader
                type="card"
                class="v-skeleton-loader--custom"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>

        <!-- No Requests Announcement -->
        <v-container fluid v-if="!isLoading && !paginatedRequests.length">
          <v-row class="pa-lg-16 pa-md-10">
            <v-col cols="12" class="text-center my-lg-10 pa-16">
              <h2>Không có yêu cầu</h2>
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
        'Tất cả',
        'Toán',
        'Tiếng Anh',
        'Ngữ văn',
        'Vật lý',
        'Hóa học',
        'Sinh học',
        'IELTS',
        'TOEIC'
      ],
      page: 1,
      isLoading: false,
      queryStr: '',
      query: {
        subject: 'tất cả',
        format: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      paginatedRequests: 'request/paginatedRequestList'
    })
  },
  watch: {
    query: {
      handler () {
        this.filterRequests()
      },
      deep: true
    },
    page () {
      this.showLoader()
      setTimeout(() => {
        this.hideLoader()
      }, 500)
    }
  },
  mounted () {
    this.filterRequests()
  },
  methods: {
    async filterRequests () {
      this.showLoader()
      await this.$store.dispatch('request/filterRequests', this.query)
      this.hideLoader()

      this.$store.dispatch('request/paginateRequestList')
    },

    async queryRequestsByQueryStr () {
      this.isLoading = true
      await this.$store.dispatch('request/queryRequestById', this.queryStr)
      this.$store.dispatch('request/paginateRequestList')
      this.isLoading = false
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
.v-input--custom {
  border-radius: 0;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>

<style scoped>
::v-deep .v-pagination__item {
  border: 1px solid #BDBDBD;
  border-radius: 0;
  box-shadow: none;
}
::v-deep .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
}
</style>
