<template>
  <v-dialog
    v-model="isDialogShowed"
    width="400"
    @click:outside="$emit('close-dialog')"
  >
    <v-card flat tile>
      <v-card-title class="px-4">
        <h4>
          <slot name="dialogTitle">Dialog Title</slot>
        </h4>
      </v-card-title>

      <v-card-text class="px-4">
        <slot name="dialogContent">
          This is confirm description.
        </slot>
      </v-card-text>

      <v-divider class="mx-4"/>

      <v-card-actions>
        <v-btn
          tile
          depressed
          class="px-3 text-capitalize"
          @click="$emit('close-dialog')"
        >
          <slot name="cancelBtnText">Cancel</slot>
        </v-btn>

        <v-spacer />

        <v-btn
          tile
          depressed
          color="teal darken-1"
          class="px-3 text-capitalize white--text"
          :loading="isConfirming"
          @click="$emit('confirm')"
        >
          <slot name="confirmBtnText">Confirm</slot>
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
    },
    isConfirming: {
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
