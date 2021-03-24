<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Fecha de creación:</span> {{ formatdate(item.createAt) }}</div>
      <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Creador:</span> {{ item.creador }}</div>
      <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Institución creadora:</span> {{ item.entidad }}</div>
      <v-divider class="darken1" v-if="items.length - 1 != index" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'BlockItem',
  inheritAttrs: false,
  props: {
    items: Array,
  },
  methods: {
    formatdate(date) {
      return moment(date).format('DD-MM-YYYY hh:mm')
    },
  },
}
</script>
