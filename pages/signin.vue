<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="justify-center mb-4">
            <h3>Đăng nhập</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                color="teal accent-4"
                dense
                outlined
                single-line
                :rules="emailRules"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                v-model="password"
                label="Mật khẩu"
                color="teal accent-4"
                dense
                outlined
                single-line
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                class="pb-0 mb-0"
                @click:append="isPwShowed = !isPwShowed"
                @keyup.enter="signIn"
              ></v-text-field>

              <nuxt-link to="" class="link">
                Quên mật khẩu?
              </nuxt-link>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="center">
                <v-btn
                  color="teal darken-1"
                  depressed
                  block
                  :loading="isSigningIn"
                  class="py-5 text-capitalize white--text"
                  @click="signIn"
                >
                  Đăng nhập
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Chưa có tài khoản?
                  <nuxt-link to="/signup" class="link">
                    Đăng ký
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import regex from '~/util/regex.js'
import msg from '~/util/message.js'

export default {
  data () {
    return {
      email: '',
      emailRules: [
        val => !!val.trim() || msg.auth.emailRequired,
        val => (val.trim() && regex.email.test(val)) || msg.auth.invalidEmailFormat
      ],
      password: '',
      isPwShowed: false,
      passwordRules: [
        val => !!val || msg.auth.pwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength
      ],
      isSigningIn: false
    }
  },
  methods: {
    signIn () {
      if (this.$refs.form.validate()) {
        this.isSigningIn = true

        this.$store.dispatch('user/signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.isSigningIn = false
          $nuxt.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.isSigningIn = false
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
.container {
  height: 95vh;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
</style>
