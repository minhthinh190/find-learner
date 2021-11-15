<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row
      justify="space-between"
      class="px-md-16"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="pr-16 box"
      >
        <div>
          <h2 class="pb-4">
            Lorem ipsum dolor sit amet
          </h2>
          <p>
            Duis a varius urna. Duis et cursus erat, vel euismod magna. Etiamaaaaa hocu cursus porta, vivamus sit amet tortor pretium. Duis a varius urna. Duis et cursus erat, vel euismod magna. Etiamaaaaa hocu cursus porta.
          </p>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        class="box"
      >
        <v-form ref="form">
          <p class="text-h5">
            Fill out the form
          </p>

          <v-text-field
            v-model="subject"
            label="Subject"
            solo
            flat
            :rules="inputRules"
          ></v-text-field>

          <v-select
            v-model="format"
            label="Format"
            solo
            flat
            :items="formatOptions"
            :rules="inputRules"
          ></v-select>

          <v-text-field
            v-model="address"
            label="Address"
            solo
            flat
            :rules="inputRules"
          ></v-text-field>

          <v-row>
            <v-col>
              <v-text-field
                v-model="perWeek"
                label="Sessions per week"
                type="number"
                solo
                flat
                :rules="inputRules"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="duration"
                label="Duration (mins)"
                type="number"
                solo
                flat
                :rules="inputRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="time"
            label="Time"
            type="time"
            solo
            flat
            :rules="inputRules"
          ></v-text-field>

          <v-text-field
            v-model="contact"
            label="Contact"
            solo
            flat
            :rules="inputRules"
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            solo
            flat
            rows="4"
            no-resize
          ></v-textarea>

          <v-row>
            <v-spacer />

            <v-col class="text-right">
              <v-btn
                color="teal darken-1"
                depressed
                class="pa-5 white--text"
                @click="submit"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import msg from '~/util/message'
import { bookingAPI } from '~/api/booking'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      inputRules: [
        val => !!val || msg.form.inputRequired
      ],
      formatOptions: ['Offline', 'Online'],
      subject: null,
      format: null,
      address: null,
      perWeek: null,
      duration: null,
      time: null,
      contact: null,
      description: null
    }
  },
  computed: {
    ...mapGetters('user', {
      userEmail: 'userEmail'
    })
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        const bookingData = {
          subject: this.subject,
          format: this.format,
          address: this.address,
          perWeek: this.perWeek,
          duration: this.duration,
          time: this.time,
          contact: this.contact,
          description: this.description,
          tutors: [],
          status: 'waiting',
          createdDate: new Date().toLocaleDateString()
        }

        bookingAPI.createNewBooking(this.userEmail, bookingData)
          .then(() => {
            this.showNotification('Your request sent!', 'success')
            this.$refs.form.reset()
          })
          .catch((err) => {
            console.log(err)
            this.showNotification(err, 'error')
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
/*
.box {
  border: 1px solid blue;
}
*/
</style>
