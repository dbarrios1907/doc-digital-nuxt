<template>
  <v-data-table v-bind="$attrs" v-on="$listeners">
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope" /></template>
  </v-data-table>
</template>

<script>
import './DataTable.scss'
export default {
  name: 'DataTable',
  inheritAttrs: false,
}
</script>
