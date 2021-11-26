<template>
  <!--
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="justify-center mb-4">
            <h3>Sign Up</h3>
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
                label="Password"
                color="teal accent-4"
                dense
                outlined
                single-line
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                @click:append="isPwShowed = !isPwShowed"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                label="Confirm Password"
                ref="confirmPassword"
                color="teal accent-4"
                dense
                outlined
                :type="isCfPwShowed ? 'text' : 'password'"
                :append-icon="isCfPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules"
                @click:append="isCfPwShowed = !isCfPwShowed"
                @keyup.enter="signUp"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="center">
                <v-btn
                  color="teal darken-1"
                  depressed
                  block
                  :loading="isSigningUp"
                  class="py-5 text-capitalize white--text"
                  @click="signUp"
                >
                  Sign Up
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Already have an account?
                  <nuxt-link to="/signin" class="link">
                    Sign in
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  -->
  <v-container fluid class="pa-16">
    <v-sheet class="mx-16 px-14 py-7">
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">Register Form</h2>
        </v-col>
      </v-row>

      <v-divider class="my-4"/>

      <!-- Personal Info -->
      <v-row>
        <v-col cols="12">
          <h3>Personal Info</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Name</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2" class="pb-0 ">
          <p>Gender</p>
        </v-col>
        <v-col cols="3" class="pb-0 ">
          <v-radio-group row class="pa-0 ma-0">
            <v-radio
              label="Male"
              value="male"
            ></v-radio>
            <v-radio
              label="Female"
              value="female"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Phone number</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Date of Birth</p>
        </v-col>

        <v-col cols="1">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="1">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="1">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Hometown</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Job Title -->
      <v-row>
        <v-col cols="12">
          <h3>Job Title</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2" class="pb-0 ">
          <p>Current job</p>
        </v-col>
        <v-col cols="5" class="pb-0 ">
          <v-radio-group row class="pa-0 ma-0">
            <v-radio
              label="Undergraduate"
              value="undergraduate"
            ></v-radio>
            <v-radio
              label="Graduated"
              value="graduated"
            ></v-radio>
            <v-radio
              label="Teacher"
              value="teacher"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>School/University</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Faculty</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Self-introduction -->
      <v-row>
        <v-col cols="12">
          <h3>Self-introduction</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Self-introduction</p>
        </v-col>
        <v-col cols="6">
          <v-textarea
            outlined
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Teaching experiences</p>
        </v-col>
        <v-col cols="6">
          <v-textarea
            outlined
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Achievements</p>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Services -->
      <v-row>
        <v-col cols="12">
          <h3>Services</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2" class="pb-0 ">
          <p>Format</p>
        </v-col>
        <v-col cols="5" class="pb-0 ">
          <v-radio-group row class="pa-0 ma-0">
            <v-radio
              label="Offline"
              value="offline"
            ></v-radio>
            <v-radio
              label="Online"
              value="online"
            ></v-radio>
            <v-radio
              label="Both"
              value="both"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row class="pb-4 ">
        <v-col cols="2" class="pb-0">
          <p>Time</p>
        </v-col>
        <v-col cols="6" class="pb-0">
          <v-data-table
            :headers="timeTableHeaders"
            :items="timeTableData"
            dense
            hide-default-footer
          >
            <template v-slot:item.morning="{ item }">
              <v-checkbox
                hide-details
                class="ma-0"
              ></v-checkbox>
            </template>
            <template v-slot:item.afternoon="{ item }">
              <v-checkbox
                hide-details
                class="ma-0"
              ></v-checkbox>
            </template>
            <template v-slot:item.evening="{ item }">
              <v-checkbox
                hide-details
                class="ma-0"
              ></v-checkbox>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row class="pb-4">
        <v-col cols="2" class="pb-0">
          <p>Fee table</p>
        </v-col>
        <v-col cols="6" class="pb-0">
          <v-data-table
            :headers="feeTableHeaders"
            :items="feeTableData"
            hide-default-footer
          >
            <template v-slot:item.subject="{ item }">
              <v-text-field
                dense
                outlined
                single-line
                hide-details
              ></v-text-field>
            </template>
            <template v-slot:item.level="{ item }">
              <v-text-field
                dense
                outlined
                single-line
                hide-details
              ></v-text-field>
            </template>
            <template v-slot:item.fee="{ item }">
              <v-text-field
                dense
                outlined
                single-line
                hide-details
              ></v-text-field>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Account -->
      <v-row>
        <v-col cols="12">
          <h3>Account</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Email</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Password</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
            :type="isPwShowed ? 'text' : 'password'"
            :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isPwShowed = !isPwShowed"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <p>Confirm password</p>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            outlined
            single-line
            hide-details
            :type="isCfPwShowed ? 'text' : 'password'"
            :append-icon="isCfPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isCfPwShowed = !isCfPwShowed"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn
            color="teal darken-1"
            depressed
            class="pa-5 white--text"
          >
            Sign Up
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
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
      confirmPassword: '',
      isCfPwShowed: false,
      confirmPasswordRules: [
        val => !!val || msg.auth.confirmPwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength,
        val => (val && val === this.password) || msg.auth.pwNotMatch
      ],
      isSigningUp: false,
      timeTableHeaders: [
        { text: 'Weekday', value: 'weekday', align: '', sortable: false },
        { text: 'Morning', value: 'morning', align: '', sortable: false },
        { text: 'Afternoon', value: 'afternoon', align: '', sortable: false },
        { text: 'Evening', value: 'evening', align: '', sortable: false }
      ],
      timeTableData: [
        { weekday: 'Monday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Tuesday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Wednesday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Thursday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Friday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Saturday', morning: '', afternoon: '', evening: '' },
        { weekday: 'Sunday', morning: '', afternoon: '', evening: '' }
      ],
      feeTableHeaders: [
        { text: 'Subject', value: 'subject', align: '', sortable: false },
        { text: 'Level', value: 'level', align: '', sortable: false },
        { text: 'Fee/session (VND)', value: 'fee', align: '', sortable: false }
      ],
      feeTableData: [
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' },
        { subject: '', level: '', fee: '' }
      ]
    }
  },
  watch: {
    password () {
      this.$refs.confirmPassword.validate()
    }
  },
  methods: {
    signUp () {
      if (this.$refs.form.validate()) {
        this.isSigningUp = true

        this.$store.dispatch('user/signUp', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.isSigningUp = false
          $nuxt.$router.push({ name: 'update-profile' })
        })
        .catch(err => {
          this.isSigningUp = false
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
. {
  border: 1px solid red;
}
.container {
  background: #F5F5F5;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
p {
  margin: 0;
}
</style>
