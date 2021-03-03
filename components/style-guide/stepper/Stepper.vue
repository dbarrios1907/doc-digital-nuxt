<template>
  <v-stepper v-bind="$attrs" v-on="$listeners" alt-labels>
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
  </v-stepper>
</template>

<script>
import './Steeper.scss'
export default {
  name: 'DxStepper'
}
</script>
