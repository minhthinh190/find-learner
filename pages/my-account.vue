<template>
  <v-container
    fluid
    class="mb-16 py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16 pb-16">
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

            <h4 class="ml-3">
              {{ tutor ? tutor.name : '' }}
            </h4>
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
        <v-container class="px-16 pt-10 pb-6 box" fluid>
          <v-row>
            <v-col cols="12" class="px-0">
              <v-form ref="form">
                <v-row class="my-0">
                  <v-col cols="3">
                    <h4 class="mt-1">Mật khẩu hiện tại</h4>
                  </v-col>

                  <v-col cols="5">
                    <v-text-field
                      v-model="currentPassword"
                      outlined
                      dense
                      single-line
                      color="teal accent-4"
                      :type="isPwShowed ? 'text' : 'password'"
                      :append-icon="isPwShowed ? 'mdi-eye': 'mdi-eye-off'"
                      :rules="passwordRules"
                      class="v-input--custom"
                      @click:append="isPwShowed = !isPwShowed"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="my-0">
                  <v-col cols="3">
                    <h4 class="mt-1">Mật khẩu mới</h4>
                  </v-col>

                  <v-col cols="5">
                    <v-text-field
                      v-model="newPassword"
                      outlined
                      dense
                      single-line
                      color="teal accent-4"
                      :type="isNewPwShowed ? 'text' : 'password'"
                      :append-icon="isNewPwShowed ? 'mdi-eye': 'mdi-eye-off'"
                      :rules="passwordRules"
                      class="v-input--custom"
                      @click:append="isNewPwShowed = !isNewPwShowed"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="my-0">
                  <v-col cols="3">
                    <h4 class="mt-1">Xác nhận mật khẩu</h4>
                  </v-col>

                  <v-col cols="5">
                    <v-text-field
                      ref="confirmNewPassword"
                      outlined
                      dense
                      single-line
                      color="teal accent-4"
                      :type="isCfNewPwShowed ? 'text' : 'password'"
                      :append-icon="isCfNewPwShowed ? 'mdi-eye': 'mdi-eye-off'"
                      :rules="confirmPasswordRules"
                      class="v-input--custom"
                      @click:append="isCfNewPwShowed = !isCfNewPwShowed"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>

          <v-spacer class="my-14"/>

          <v-row>
            <v-col class="px-0 text-right">
              <v-btn
                tile
                depressed
                color="teal darken-1"
                :loading="isChangingPassword"
                class="white--text text-capitalize"
                @click="changePassword"
              >
                Đổi mật khẩu
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import msg from '~/util/message.js'
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      isLoading: false,
      isChangingPassword: false,
      //
      currentPassword: '',
      newPassword: '',
      //
      isPwShowed: false,
      isNewPwShowed: false,
      isCfNewPwShowed: false,
      //
      passwordRules: [
        val => !!val || msg.auth.pwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength
      ],
      confirmPasswordRules: [
        val => !!val || msg.auth.confirmPwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength,
        val => (val && val === this.newPassword) || msg.auth.pwNotMatch
      ]
    }
  },
  computed: {
    ...mapState({
      tutor: state => state.user.profile,
      userEmail: state => state.user.email
    })
  },
  watch: {
    newPassword () {
      this.$refs.confirmNewPassword.validate()
    }
  },
  created () {
    this.$store.dispatch('user/getUserProfile')
  },
  methods: {
    changePassword () {
      if (this.$refs.form.validate()) {
        this.isChangingPassword = true

        this.$store.dispatch('user/changePassword', {
          newPassword: this.newPassword
        })
        .then(() => {
          $nuxt.$router.push({ name: 'signin' })
          this.isChangingPassword = false
        })
        .catch((err) => {
          this.isChangingPassword = false
          this.showNotification(err.code, 'error')
        })
      }
    },

    showNotification (message, color) {
      this.$store.dispatch('notification/showNotification', {
        message,
        color
      })
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid #BDBDBD;
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
.status-label--waiting {
  background: #E57373;
}
.status-label--on-going {
  background: #E6EE9C;
}
.status-label--finished {
  background: #80CBC4;
}
.v-input--custom {
  border-radius: 0;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>
