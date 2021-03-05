<template>
  <v-stepper v-bind="$attrs" alt-labels :class="[{ ismobil: ismobil }]">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
  </v-stepper>
</template>

<script>
import './Steeper.scss'
export default {
  name: 'DxStepper',
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs
    },
  },
}
</script>
