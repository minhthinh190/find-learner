<template>
  <v-container fluid class="pa-sm-5 pa-md-16">
    <v-sheet class="mx-lg-16 px-lg-14 pt-7 pb-8">
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <h2 class="text-center">Đăng ký làm gia sư</h2>
          </v-col>
        </v-row>

        <v-divider class="mt-6 mb-4"/>

        <!-- Personal Info -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Thông tin cá nhân</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Họ tên</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="personalInfo.name"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0">
            <p class="label">Giới tính</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-radio-group
              v-model="personalInfo.gender"
              row
              class="pa-0 ma-0"
              :rules="numberInputRules"
            >
              <v-radio
                label="Nam"
                value="male"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Nữ"
                value="female"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Số điện thoại</p>
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
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Ngày sinh</p>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthDate"
              dense
              outlined
              color="teal accent-4"
              placeholder="Ngày"
              :items="dateSelectData"
              :rules="numberInputRules"
              class="v-input--custom"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthMonth"
              dense
              outlined
              color="teal accent-4"
              placeholder="Tháng"
              :items="monthSelectData"
              :rules="numberInputRules"
              class="v-input--custom"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="3" class="py-0">
            <v-select
              v-model="personalInfo.birthYear"
              dense
              outlined
              color="teal accent-4"
              placeholder="Năm"
              :items="yearSelectData"
              :rules="numberInputRules"
              class="v-input--custom"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Quê quán</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="personalInfo.hometown"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Job Title -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Nghề nghiệp</h3>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0">
            <p class="label">Nghề nghiệp</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-radio-group
              v-model="jobTitle.currentJob"
              row
              class="pa-0 ma-0"
              :rules="numberInputRules"
            >
              <v-radio
                label="Sinh viên"
                value="student"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Đã tốt nghiệp"
                value="graduated"
                color="teal accent-4"
              ></v-radio>
              <v-radio
                label="Giáo viên"
                value="teacher"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Trường</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="jobTitle.school"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Khoa/Lớp</p>
          </v-col>
          <v-col cols="12" md="3" sm="5" class="py-0">
            <v-text-field
              v-model="jobTitle.faculty"
              dense
              outlined
              single-line
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Self-introduction -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Tự giới thiệu</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Tự giới thiệu</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-textarea
              v-model="selfIntroduction.selfIntroduction"
              outlined
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Kinh nghiệm dạy học</p>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-textarea
              v-model="selfIntroduction.teachingExperiences"
              outlined
              color="teal accent-4"
              :rules="textInputRules"
              class="v-input--custom"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <p class="label">Đặc điểm nổi bật</p>
          </v-col>
          <v-col cols="12" md="6" sm="5" class="py-0">
            <v-select
              v-model="selfIntroduction.achievement"
              outlined
              multiple
              chips
              color="teal accent-4"
              :items="achievementSelectData"
              class="v-input--custom"
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
            <h3>Thông tin dịch vụ</h3>
          </v-col>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="2" class="pb-0 ">
            <p class="label">Hình thức dạy</p>
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
                label="Offline & Online"
                value="both"
                color="teal accent-4"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row class="pb-8">
          <v-col cols="2" class="pb-0">
            <p class="label">Thời gian rảnh</p>
          </v-col>
          <v-col cols="12" lg="6" md="8" sm="10" class="py-0">
            <v-data-table
              :headers="timeTableHeaders"
              :items="services.freeTime"
              dense
              hide-default-footer
            >
              <template v-slot:[`item.morning`]="{ item }">
                <v-checkbox
                  v-model="item.morning"
                  color="teal accent-4"
                  hide-details
                  class="ma-0"
                ></v-checkbox>
              </template>
              <template v-slot:[`item.afternoon`]="{ item }">
                <v-checkbox
                  v-model="item.afternoon"
                  color="teal accent-4"
                  hide-details
                  class="ma-0"
                ></v-checkbox>
              </template>
              <template v-slot:[`item.evening`]="{ item }">
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
            <p class="label">Bảng học phí</p>
          </v-col>
          <v-col cols="12" md="10" class="py-0">
            <v-data-table
              :headers="feeTableHeaders"
              :items="services.fee"
              hide-default-footer
            >
              <template v-slot:[`item.subject`]="{ item }">
                <v-select
                  v-model="item.subject"
                  dense
                  outlined
                  hide-details
                  color="teal accent-4"
                  placeholder="Môn học"
                  :items="subjectSelectData"
                  class="v-input--custom"
                ></v-select>
              </template>
              <template v-slot:[`item.level`]="{ item }">
                <v-select
                  v-model="item.level"
                  dense
                  outlined
                  hide-details
                  multiple
                  color="teal accent-4"
                  placeholder="Lớp"
                  :items="levelSelectData"
                  class="v-input--custom"
                ></v-select>
              </template>
              <template v-slot:[`item.fee`]="{ item }">
                <v-text-field
                  v-model="item.fee"
                  dense
                  outlined
                  single-line
                  hide-details
                  color="teal accent-4"
                  placeholder="50000"
                  type="number"
                  class="v-input--custom"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <!-- Account -->
        <v-row class="py-3">
          <v-col cols="12">
            <h3>Tài khoản</h3>
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
              class="v-input--custom"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2" class="py-0">
            <p class="label">Mật khẩu</p>
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
              class="v-input--custom"
              @click:append="isPwShowed = !isPwShowed"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2" class="py-0">
            <p class="ma-0 label">Nhập lại mật khẩu</p>
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
              class="v-input--custom"
              @click:append="isCfPwShowed = !isCfPwShowed"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pt-5">
          <v-col cols="12" sm="6">
            <p>
              Đã có tài khoản?
              <nuxt-link to="/signin" class="link">
                Đăng nhập
              </nuxt-link>
            </p>
          </v-col>
          <v-col cols="12" sm="6" class="text-right">
            <v-btn
              color="teal darken-1"
              tile
              depressed
              :loading="isSigningUp"
              class="pa-5 white--text"
              @click="signUp"
            >
              Đăng ký làm gia sư
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
        'Toán',
        'Vật lý',
        'Hóa học',
        'Sinh học',
        'Ngữ văn',
        'Tiếng Anh',
        'TOEIC',
        'IELTS'
      ],
      levelSelectData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //
      timeTableHeaders: [
        { text: 'Ngày trong tuần', value: 'weekday', align: '', sortable: false },
        { text: 'Sáng', value: 'morning', align: '', sortable: false },
        { text: 'Chiều', value: 'afternoon', align: '', sortable: false },
        { text: 'Tối', value: 'evening', align: '', sortable: false }
      ],
      feeTableHeaders: [
        { text: 'Môn học', value: 'subject', align: '', sortable: false },
        { text: 'Lớp', value: 'level', align: '', sortable: false },
        { text: 'Học phí/buổi', value: 'fee', align: '', sortable: false }
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
        achievement: []
      },
      // Services
      services: {
        format: '',
        freeTime: [
          { weekday: 'Thứ 2', morning: false, afternoon: false, evening: false },
          { weekday: 'Thứ 3', morning: false, afternoon: false, evening: false },
          { weekday: 'Thứ 4', morning: false, afternoon: false, evening: false },
          { weekday: 'Thứ 5', morning: false, afternoon: false, evening: false },
          { weekday: 'Thứ 6', morning: false, afternoon: false, evening: false },
          { weekday: 'Thứ 7', morning: false, afternoon: false, evening: false },
          { weekday: 'Chủ nhật', morning: false, afternoon: false, evening: false }
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
          name: this.formatName(this.personalInfo.name),
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
          email: this.account.email,
          // Class List
          class: []
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

    formatName (name) {
      let formattedName = name
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

      return formattedName
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
.v-input--custom {
  border-radius: 0;
}
</style>
