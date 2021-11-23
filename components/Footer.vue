<template>
  <v-footer padless>
    <v-card
      flat
      tile
      width="100%"
      class="px-md-16"
    >
      <v-card-text>
        <v-row class="py-4">
          <v-col cols="4">
            <h2 class="mb-4">Find Learner</h2>
            <p>
              Dribbble is the world’s leading community for creatives to share, grow, and get hired.
              Lorem ipsum dolor sit amet lorem ipsum dolor sit amet.
            </p>
            <p class="ma-0">
              Hotline: <b>19001000</b>
            </p>
            <p class="ma-0">Email: help@findtutor.com</p>
          </v-col>

          <!--
          <v-col cols="2">
            <h3 class="mb-2">Lorem 1</h3>

            <div
              v-for="(subject, index) in primarySubjects"
              :key="index"
              class="mt-2"
            >
              <div
                v-for="(level, index) in subject.levels"
                :key="index"
                class="link-container"
              >
                <nuxt-link to="" class="link">
                  {{ level }}
                </nuxt-link>

                <p v-if="index !== subject.levels.length - 1">
                  /
                </p>
              </div>
            </div>
          </v-col>

          <v-col cols="2">
            <h3>Lorem 2</h3>

            <div
              v-for="(subject, index) in secondarySubjects"
              :key="index"
              class="mt-2"
            >
              <div
                v-for="(level, index) in subject.levels"
                :key="index"
                class="link-container"
              >
                <nuxt-link to="" class="link">
                  {{ level }}
                </nuxt-link>

                <p v-if="index !== subject.levels.length - 1">
                  /
                </p>
              </div>
            </div>
          </v-col>

          <v-col cols="2">
            <h3>Lorem 3</h3>

            <div
              v-for="(subject, index) in highSubjects"
              :key="index"
              class="mt-2"
            >
              <div
                v-for="(level, index) in subject.levels"
                :key="index"
                class="link-container"
              >
                <nuxt-link to="" class="link">
                  {{ level }}
                </nuxt-link>

                <p v-if="index !== subject.levels.length - 1">
                  /
                </p>
              </div>
            </div>
          </v-col>

          <v-col cols="2">
            <h3>English</h3>

            <v-spacer class="mt-2"/>

            <div
              v-for="(item, index) in english"
              :key="index"
              class="link-container"
            >
              <nuxt-link to="" class="link">
                {{ item }}
              </nuxt-link>

              <p v-if="index !== english.length - 1">
                /
              </p>
            </div>
          </v-col>
          -->
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
        <p class="ma-0">Address: 52 UT Street, TB Square, New York City</p>
        <p class="ma-0">Lorem ipsum dolor sit amet consectetur adipisicing elit, libero eos ipsam facilis numquam est.</p>
        <p class="ma-0">Consequuntur facilis, inventore quas at ab ipsam quo vel cum, impedit asperiores sunt eos minima dicta.</p>
      </v-card-text>

      <v-divider />

      <v-card-text>
        &copy; 2021 Find Tutor. All rights reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      /*
      primarySubjects: [
        {
          name: 'Math',
          levels: ['Math 1', 'Math 2', 'Math 3', 'Math 4', 'Math 5']
        },
        {
          name: 'English',
          levels: ['English 1', 'English 2', 'English 3', 'English 4', 'English 5']
        }
      ],
      secondarySubjects: [
        {
          name: 'Math',
          levels: ['Math 6', 'Math 7', 'Math 8', 'Math 9']
        },
        {
          name: 'English',
          levels: ['English 6', 'English 7', 'English 8', 'English 9']
        },
        {
          name: 'Physics',
          levels: ['Physics 6', 'Physics 7', 'Physics 8', 'Physics 9']
        },
        {
          name: 'Biology',
          levels: ['Biology 7', 'Biology 8', 'Biology 9']
        },
        {
          name: 'Chemistry',
          levels: ['Chemistry 8', 'Chemistry 9']
        }
      ],
      highSubjects: [
        {
          name: 'Math',
          levels: ['Math 10', 'Math 11', 'Math 12']
        },
        {
          name: 'Physics',
          levels: ['Physics 10', 'Physics 11', 'Physics 12']
        },
        {
          name: 'Chemistry',
          levels: ['Chemistry 10', 'Chemistry 11', 'Chemistry 12']
        },
        {
          name: 'Biology',
          levels: ['Biology 10', 'Biology 11', 'Biology 12']
        },
        {
          name: 'Literature',
          levels: ['Literature 10', 'Literature 11', 'Literature 12']
        },
        {
          name: 'English',
          levels: ['English 10', 'English 11', 'English 12']
        }
      ],
      english: ['IELTS', 'TOEIC', 'TOEFL', 'VSTEP']
      */
    }
  }
}
</script>

<style scoped>
.link-container {
  display: inline;
}
.link-container p {
  display: inline;
}
.link {
  display: inline-block;
  color: #757575;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
