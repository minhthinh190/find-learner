<template>
  <v-container
    fluid
    fill-height
    class="root-container"
  >
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card elevation="0" class="pa-6 custom-card">
          <v-card-title class="justify-center mb-4">
            <h3>Fill in the form</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="name"
                label="Name"
                color="teal accent-4"
                :rules="inputRequired"
                placeholder="Name"
                dense
                outlined
                single-line
              ></v-text-field>

              <v-spacer class="py-1" />

              <div class="d-flex justify-space-between">
                <p class="ma-0 pt-1">
                  <strong>Gender:</strong>
                </p>

                <v-radio-group
                  v-model="gender"
                  :rules="inputRequired"
                  row
                  class="ma-0"
                >
                  <v-radio
                    label="Male"
                    value="male"
                    color="teal darken-1"
                  ></v-radio>

                  <v-radio
                    label="Female"
                    value="female"
                    color="teal darken-1"
                  ></v-radio>
                </v-radio-group>
              </div>
              
              <v-spacer class="py-1" />

              <v-text-field
                v-model="dateOfBirth"
                label="Date of Birth"
                color="teal accent-4"
                :rules="inputRequired"
                placeholder="Date of Birth"
                type="date"
                dense
                outlined
                single-line
                class="pb-0 mb-0"
              ></v-text-field>
            
              <v-spacer class="py-1" />
              
              <v-text-field
                v-model="hometown"
                label="Hometown"
                color="teal accent-4"
                :rules="inputRequired"
                placeholder="Hometown"
                dense
                outlined
                single-line
                class="pb-0 mb-0"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                v-model="phoneNumber"
                label="Phone number"
                color="teal accent-4"
                :rules="inputRequired"
                placeholder="Phone number"
                type="number"
                dense
                outlined
                single-line
                class="pb-0 mb-0"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="right">
                <v-btn
                  color="teal darken-1"
                  depressed
                  :loading="isSubmitting"
                  class="py-5 text-capitalize white--text"
                  @click="submit"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { tutorAPI } from '~/api/tutor'
import { authAPI } from '~/api/auth'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  data () {
    return {
      inputRequired: [
        val => !!val || 'Please fill out the input!'
      ],
      isSubmitting: false,
      name: null,
      gender: null,
      dateOfBirth: null,
      hometown: null,
      phoneNumber: null
    }
  },
  computed: {
    ...mapGetters('user', {
      userEmail: 'userEmail'
    })
  },
  methods: {
    submit () {
      authAPI.getTutors()

      if (this.$refs.form.validate()) {
        this.isSubmitting = true

        tutorAPI.updateTutorProfile(this.userEmail, {
          name: this.name,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth,
          hometown: this.hometown,
          phoneNumber: this.phoneNumber
        })
        .then(() => {
          this.isSubmitting = false
          this.$refs.form.reset()
          $nuxt.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.isSubmitting = false
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
  height: 100vh;
}
.custom-card {
  border-radius: 0;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
