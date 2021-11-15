<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="justify-center mb-4">
            <h3>Sign In</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                color="teal accent-4"
                dense
                outlined
                :rules="emailRules"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                v-model="password"
                label="Password"
                color="teal accent-4"
                dense
                outlined
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                class="pb-0 mb-0"
                @click:append="isPwShowed = !isPwShowed"
                @keyup.enter="signIn"
              ></v-text-field>

              <nuxt-link to="" class="link">
                Forgot your password?
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
                  class="py-5 text-capitalize white--text"
                  @click="signIn"
                >
                  Sign In
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Don't have an account?
                  <nuxt-link to="/signup" class="link">
                    Sign up
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
      ]
    }
  },
  methods: {
    signIn () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          $nuxt.$router.push({ name: 'index' })
        })
        .catch(err => {
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
