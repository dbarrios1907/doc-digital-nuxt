<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <v-chip color="primary" small>
        {{ formatdate(item.createAt) }}
      </v-chip>
      <div class="font-small line-height-23"><span class="darken3--text weight-700">Devuelto por:</span> {{ item.ejecutor }}</div>
      <div class="font-small line-height-23"><span class="darken3--text weight-700">Etapa de la tramitación:</span> {{ item.tipoEtapa }}</div>
      <div class="font-small line-height-23"><span class="darken3--text weight-700">Motivo de la devolución:</span> {{ item.motivoDevolucion }}</div>
      <v-divider class="darken1 my-4" v-if="items.length - 1 != index" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'NotifyItem',
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
<style lang="scss" scoped>
@include theme(v-chip) using($material) {
  border-radius: rem-calc(3px);
}
</style>
