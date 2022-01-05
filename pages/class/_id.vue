<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <v-col
        cols="12"
        md="3"
        class="pr-md-6 pa-0"
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
            <v-icon class="mr-3">
              mdi-account
            </v-icon>

            <nuxt-link to="/my-account" class="nav-link">
              Tài khoản của tôi
            </nuxt-link>
          </div>

          <!--
          <div class="px-4 py-2 nav-item">
            <v-icon class="mr-3">
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
        class="pl-md-3 pa-0"
      >
        <!-- Loader -->
        <v-container v-if="isLoading" fluid>
          <v-row>
            <v-col class="pl-3">
              <v-skeleton-loader
                type="heading"
              ></v-skeleton-loader>

              <v-spacer class="my-6"/>

              <div
                v-for="n in 2"
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

        <!-- Class Details -->
        <v-container v-else fluid>
          <v-row class="mb-1">
            <!-- Status -->
            <v-col cols="6" class="pl-3">
              <div
                class="px-2 py-1 status-label"
                :class="{
                  'status-label--responding': classDetails.status === 'responding',
                  'status-label--applying': classDetails.status === 'waiting',
                  'status-label--on-going': classDetails.status === 'on-going',
                  'status-label--finished': classDetails.status === 'finished'
                }" 
              >
                {{ translateStatus(classDetails.status) }}
              </div>
            </v-col>

            <!-- Created Date -->
            <v-col cols="6">
              <div class="mt-1">
                <p class="ma-0 text-right subtitle-2 created-date">
                  Ngày tạo: {{ classDetails.createdDate }}
                </p>
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-data-table
                :headers="headers"
                :items="generateDetailsTableData()"
                hide-default-footer
                class="v-table--custom"
              ></v-data-table>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <div class="px-4 pt-4 pb-0">
                  <p class="ma-0 font-weight-bold">
                    Mô tả
                  </p>
                </div>

                <v-card-text class="pt-2">
                  {{ classDetails.description }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Địa chỉ:&nbsp;
                    </span>
                    {{ classDetails.address }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Liên hệ:&nbsp;
                    </span>
                    {{ classDetails.contact }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-if="classDetails.status === 'responding'">
            <v-col cols="12" class="text-right">
              <v-btn
                tile
                depressed
                :loading="isRejecting"
                class="mr-2 px-6 text-capitalize"
                @click="rejectRequest"
              >
                Từ chối
              </v-btn>

              <v-btn
                color="teal darken-1"
                tile
                depressed
                class="px-6 text-capitalize white--text"
                @click.stop="isDialogShowed = true"
              >
                Nhận lớp
              </v-btn>
            </v-col>
          </v-row>

          <confirm-dialog
            :isDialogShowed="isDialogShowed"
            :isConfirming="isAccepting"
            v-on:close-dialog="isDialogShowed = false"
            v-on:confirm="acceptRequest"
          >
            <template #dialogTitle>
              Xác nhận nhận lớp
            </template>

            <template #dialogContent>
              Bạn muốn nhận lớp này?
            </template>

            <template #confirmBtnText>
              Đồng ý
            </template>

            <template #cancelBtnText>
              Hủy
            </template>
          </confirm-dialog>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { classAPI } from '~/api/class'
import { requestAPI } from '~/api/request'
import ConfirmDialog from '~/components/ConfirmDialog'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    ConfirmDialog
  },
  data () {
    return {
      isLoading: false,
      isDialogShowed: false,
      isAccepting: false,
      isRejecting: false,
      headers: [
        { text: 'Môn học', value: 'subject', align: 'start', sortable: false },
        { text: 'Hình thức', value: 'format', align: 'start', sortable: false },
        { text: 'Thời gian', value: 'time', align: 'start', sortable: false },
        { text: 'Số buổi/tuần', value: 'perWeek', align: 'start', sortable: false },
        { text: 'Thời lượng', value: 'duration', align: 'start', sortable: false }
      ]
    }
  },
  computed: {
    classId () {
      return this.$route.params.id
    },
    learner () {
      return this.$route.params.learner
    },
    ...mapState({
      tutor: state => state.user.profile,
      classDetails: state => state.class.class
    })
  },
  async created () {
    this.isLoading = true
    const id = this.classId
    const userEmail = this.learner

    await this.$store.dispatch('class/getClassById', {
      userEmail,
      id
    })
    await this.$store.dispatch('user/getUserProfile')
    this.isLoading = false
  },
  methods: {
    async acceptRequest () {
      this.isAccepting = true
      const userEmail = this.learner

      await classAPI.updateClassStatus(this.classId, 'on-going')
      await requestAPI.updateRequestStatus(
        userEmail,
        this.classId,
        'on-going'
      )
      await requestAPI.updateTutorStatusOfRequest(
        userEmail,
        this.classId,
        { name: this.tutor.name, status: 'accepted' }
      )
      this.isAccepting = false
      this.$router.push({ name: 'my-class' })
    },

    async rejectRequest () {
      this.isRejecting = true
      const userEmail = this.learner

      await classAPI.rejectClass(this.classId)
      await requestAPI.updateRequestStatus(
        userEmail,
        this.classId,
        'waiting'
      )
      await requestAPI.removeTutorDataOfRequest(
        userEmail,
        this.classId,
        { name: this.tutor.name }
      )
      this.isRejecting = false
      this.$router.push({ name: 'my-class' })
    },

    generateDetailsTableData () {
      const data = [
        {
          subject: this.capitalizeFirstLetter(this.classDetails.subject),
          format: this.classDetails.format,
          time: this.classDetails.time,
          perWeek: this.classDetails.perWeek,
          duration: this.classDetails.duration + ' (phút)'
        }
      ]
      return data
    },

    translateStatus (originalStatus) {
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
          status = 'Hoàn tất'
          break
      }
      return status
    },

    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<style scoped>
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
}
.nav-item:hover .nav-link {
  color: black;
}
.nav-link {
  color: #757575;
  text-decoration: none;
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
.created-date {
  font-weight: normal;
  color: #757575;
}
.custom-card-text {
  font-size: 16px;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>

<style>
.v-table--custom {
  border: 1px solid #E0E0E0;
  border-radius: 0;
}
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
