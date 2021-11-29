<template>
  <v-dialog
    v-model="isDialogShowed"
    width="400"
    @click:outside="$emit('close-dialog')"
  >
    <v-card>
      <v-card-title class="px-4">
        <h5>Dialog Title</h5>
      </v-card-title>

      <v-card-text class="px-4">
        This is confirm description.
      </v-card-text>

      <v-divider class="mx-4"/>

      <v-card-actions>
        <v-btn
          depressed
          color="red accent-2"
          class="px-3 text-capitalize white--text"
          @click="$emit('close-dialog')"
        >
          Cancel
        </v-btn>

        <v-spacer />

        <v-btn
          depressed
          color="teal darken-1"
          class="px-3 text-capitalize white--text"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDialogShowed: {
      type: Boolean,
      required: true
    }
  }  
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
</style>
