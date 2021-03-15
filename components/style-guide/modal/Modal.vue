<template>
  <v-dialog v-bind="$attrs" v-on="$listeners">
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope" /></template>
  </v-dialog>
</template>

<script>
import './Modal.scss'
export default {
  name: 'DxDialog',
  inheritAttrs: false,
}
</script>
