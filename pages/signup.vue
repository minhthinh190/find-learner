<template>
  <v-container fluid class="pa-sm-5 pa-md-16">
    <v-sheet class="mx-lg-16 px-lg-14 pt-7 pb-8">
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <h2 class="text-center">Register Form</h2>
          </v-col>
        </v-row>

        <v-divider class="mt-6 mb-4"/>

        <!-- Personal Info -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Personal Info</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Name</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="personalInfo.name"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0">
            <p class="label">Gender</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-radio-group
              v-model="personalInfo.gender"
              row
              class="pa-0 ma-0"
              :rules="numberInputRules"
            >
              <v-radio
                label="Male"
                value="male"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Female"
                value="female"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Phone number</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="personalInfo.phone"
              dense
              outlined
              single-line
              color="teal accent-4"
              type="number"
              :rules="numberInputRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Date of Birth</p>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthDate"
              dense
              outlined
              color="teal accent-4"
              placeholder="Date"
              :items="dateSelectData"
              :rules="numberInputRules"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthMonth"
              dense
              outlined
              color="teal accent-4"
              placeholder="Month"
              :items="monthSelectData"
              :rules="numberInputRules"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthYear"
              dense
              outlined
              color="teal accent-4"
              placeholder="Year"
              :items="yearSelectData"
              :rules="numberInputRules"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Hometown</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="personalInfo.hometown"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Job Title -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Job Title</h3>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0">
            <p class="label">Current job</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-radio-group
              v-model="jobTitle.currentJob"
              row
              class="pa-0 ma-0"
              :rules="numberInputRules"
            >
              <v-radio
                label="Student"
                value="student"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Graduated"
                value="graduated"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Teacher"
                value="teacher"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">School/University</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="jobTitle.school"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Faculty</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="jobTitle.faculty"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Self-introduction -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Self-introduction</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Self-introduction</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-textarea
              v-model="selfIntroduction.selfIntroduction"
              outlined
              color="teal accent-4"
              :rules="textInputRules"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Teaching experiences</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-textarea
              v-model="selfIntroduction.teachingExperiences"
              outlined
              color="teal accent-4"
              :rules="textInputRules"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Achievements</p>
          </v-col>
          <v-col cols="12" md="6" sm="5" class="py-0">
            <v-select
              v-model="selfIntroduction.achievement"
              outlined
              multiple
              chips
              color="teal accent-4"
              :items="achievementSelectData"
            >
              <template v-slot:selection="{ item }">
                <div class="mr-2 achievement-label">
                  {{ item }}
                </div>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <!-- Services -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Services</h3>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0 ">
            <p class="label">Format</p>
          </v-col>
          <v-col cols="12" md="5" class="py-0 ">
            <v-radio-group
              v-model="services.format"
              row
              class="pa-0 ma-0"
              :rules="numberInputRules"
            >
              <v-radio
                label="Offline"
                value="offline"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Online"
                value="online"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Both"
                value="both"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row class="pb-8">
          <v-col cols="2" class="pb-0">
            <p class="label">Time</p>
          </v-col>
          <v-col cols="12" lg="6" md="8" sm="10" class="py-0">
            <v-data-table
              :headers="timeTableHeaders"
              :items="services.freeTime"
              dense
              hide-default-footer
            >
              <template v-slot:item.morning="{ item }">
                <v-checkbox
                  v-model="item.morning"
                  color="teal accent-4"
                  hide-details
                  class="ma-0"
                ></v-checkbox>
              </template>
              <template v-slot:item.afternoon="{ item }">
                <v-checkbox
                  v-model="item.afternoon"
                  color="teal accent-4"
                  hide-details
                  class="ma-0"
                ></v-checkbox>
              </template>
              <template v-slot:item.evening="{ item }">
                <v-checkbox
                  v-model="item.evening"
                  color="teal accent-4"
                  hide-details
                  class="ma-0"
                ></v-checkbox>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0">
            <p class="label">Fee table</p>
          </v-col>
          <v-col cols="12" md="10" class="py-0">
            <v-data-table
              :headers="feeTableHeaders"
              :items="services.fee"
              hide-default-footer
            >
              <template v-slot:item.subject="{ item }">
                <v-select
                  v-model="item.subject"
                  dense
                  outlined
                  hide-details
                  color="teal accent-4"
                  placeholder="Subject"
                  :items="subjectSelectData"
                ></v-select>
              </template>
              <template v-slot:item.level="{ item }">
                <v-select
                  v-model="item.level"
                  dense
                  outlined
                  hide-details
                  multiple
                  color="teal accent-4"
                  placeholder="Level"
                  :items="levelSelectData"
                ></v-select>
              </template>
              <template v-slot:item.fee="{ item }">
                <v-text-field
                  v-model="item.fee"
                  dense
                  outlined
                  single-line
                  hide-details
                  color="teal accent-4"
                  placeholder="50000"
                  type="number"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <!-- Account -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Account</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2" class="py-0">
            <p class="label">Email</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="account.email"
              dense
              outlined
              single-line
              color="teal accent-4"
              placeholder="johndoe@email.com"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2" class="py-0">
            <p class="label">Password</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="account.password"
              dense
              outlined
              single-line
              color="teal accent-4"
              :type="isPwShowed ? 'text' : 'password'"
              :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              @click:append="isPwShowed = !isPwShowed"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2" class="py-0">
            <p class="ma-0 label">Confirm password</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              ref="confirmPassword"
              v-model="account.confirmPassword"
              dense
              outlined
              single-line
              color="teal accent-4"
              :type="isCfPwShowed ? 'text' : 'password'"
              :append-icon="isCfPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="confirmPasswordRules"
              @click:append="isCfPwShowed = !isCfPwShowed"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pt-5">
          <v-col cols="12" sm="6">
            <p>
              Already have an account?
              <nuxt-link to="/signin" class="link">
                Sign in
              </nuxt-link>
            </p>
          </v-col>
          <v-col cols="12" sm="6" class="text-right">
            <v-btn
              color="teal darken-1"
              depressed
              :loading="isSigningUp"
              class="pa-5 white--text"
              @click="signUp"
            >
              Sign Up
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import regex from '~/util/regex.js'
import msg from '~/util/message.js'
import { helper } from '~/util/helpers.js'
import { tutorAPI } from '~/api/tutor'

export default {
  data () {
    return {
      isPwShowed: false,
      isCfPwShowed: false,
      isSigningUp: false,
      // Input Rules
      textInputRules: [val => !!val.trim() || 'Required!'],
      numberInputRules: [val => !!val || 'Required!'],
      emailRules: [
        val => !!val.trim() || msg.auth.emailRequired,
        val => (val.trim() && regex.email.test(val)) || msg.auth.invalidEmailFormat
      ],
      passwordRules: [
        val => !!val || msg.auth.pwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength
      ],
      confirmPasswordRules: [
        val => !!val || msg.auth.confirmPwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength,
        val => (val && val === this.account.password) || msg.auth.pwNotMatch
      ],
      //
      dateSelectData: helper.generateDateData(),
      monthSelectData: helper.generateMonthData(),
      yearSelectData: helper.generateYearData(),
      //
      achievementSelectData: [
        'Thủ khoa đại học',
        'Học sinh giỏi Quốc gia',
        'Học sinh giỏi Tỉnh/TP',
        'Huy chương Quốc tế',
        'Du học sinh',
        'Học bổng',
        'Học sinh trường THPT chuyên'
      ],
      //
      subjectSelectData: [
        'Math',
        'Physics',
        'Chemistry',
        'Biology',
        'Literature',
        'English',
        'TOEIC',
        'IELTS'
      ],
      levelSelectData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //
      timeTableHeaders: [
        { text: 'Weekday', value: 'weekday', align: '', sortable: false },
        { text: 'Morning', value: 'morning', align: '', sortable: false },
        { text: 'Afternoon', value: 'afternoon', align: '', sortable: false },
        { text: 'Evening', value: 'evening', align: '', sortable: false }
      ],
      feeTableHeaders: [
        { text: 'Subject', value: 'subject', align: '', sortable: false },
        { text: 'Level', value: 'level', align: '', sortable: false },
        { text: 'Fee/session (VND)', value: 'fee', align: '', sortable: false }
      ],
      /* Tutor Info State */
      // Personal Info
      personalInfo: {
        name: '',
        gender: '',
        phone: '',
        birthDate: '',
        birthMonth: '',
        birthYear: '',
        hometown: ''
      },
      // Job Title
      jobTitle: {
        currentJob: '',
        school: '',
        faculty: ''
      },
      // Self-introduction
      selfIntroduction: {
        selfIntroduction: '',
        teachingExperiences: '',
        achievement: ''
      },
      // Services
      services: {
        format: '',
        freeTime: [
          { weekday: 'Monday', morning: false, afternoon: false, evening: false },
          { weekday: 'Tuesday', morning: false, afternoon: false, evening: false },
          { weekday: 'Wednesday', morning: false, afternoon: false, evening: false },
          { weekday: 'Thursday', morning: false, afternoon: false, evening: false },
          { weekday: 'Friday', morning: false, afternoon: false, evening: false },
          { weekday: 'Saturday', morning: false, afternoon: false, evening: false },
          { weekday: 'Sunday', morning: false, afternoon: false, evening: false }
        ],
        fee: [
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' },
          { subject: '', level: [], fee: '' }
        ]
      },
      // Account
      account: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  watch: {
    password () {
      this.$refs.confirmPassword.validate()
    }
  },
  methods: {
    async signUp () {
      if (this.$refs.form.validate()) {
        this.isSigningUp = true

        const tutorProfile = {
          // Personal Info
          name: this.personalInfo.name,
          gender: this.personalInfo.gender,
          phone: this.personalInfo.phone,
          birthDate: this.personalInfo.birthDate,
          birthMonth: this.personalInfo.birthMonth,
          birthYear: this.personalInfo.birthYear,
          hometown: this.personalInfo.hometown,
          // Job Title
          currentJob: this.jobTitle.currentJob,
          school: this.jobTitle.school,
          faculty: this.jobTitle.faculty,
          // Self-introduction
          selfIntroduction: this.selfIntroduction.selfIntroduction,
          teachingExperiences: this.selfIntroduction.teachingExperiences,
          achievement: this.selfIntroduction.achievement,
          // Services
          format: this.services.format,
          freeTime: this.services.freeTime,
          fee: this.services.fee,
          // Account
          email: this.account.email
        }

        // Create new account
        await this.$store.dispatch('user/signUp', {
          email: this.account.email,
          password: this.account.password
        })

        // Create tutor profile
        tutorAPI.updateTutorProfile(this.account.email, {
          ...tutorProfile
        })
        .then(() => {
          this.isSigningUp = false
          this.$refs.form.reset()
          $nuxt.$router.push({ name: 'index' })
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
.box {
  border: 1px solid red;
}
.container {
  background: #F5F5F5;
}
.col {
  padding-top: 0;
  padding-bottom: 0;
}
.label {
  color: #757575;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
.achievement-label {
  width: fit-content;
  font-size: 13px;
  font-weight: bold;
  background: #E0E0E0;
  color: #263238;
  padding: 2px 6px;
}
p {
  margin: 0;
}
</style>
