<template>
  <div class="table--details">
    <v-row v-for="(item, index) of items" :key="index">
      <v-col cols="4" class="weight-700">{{ item.title }}:</v-col>
      <v-col cols="8">
        <div v-if="item.name === 'switch'">
          <span v-if="item.status">Activo</span>
          <span v-else>No activo</span>
          <v-switch v-model="item.status" inset dense :ripple="false" label="" class="ml-1 d-inline-block" color="success" />
        </div>
        <span v-else>{{ item.description }}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'TableItem',
  props: {
    items: Array,
  },
}
</script>
<style lang="scss">
@include theme(row) using($material) {
  .table--details {
    .row {
      &:not(:last-child) {
        border-bottom: 1px solid #3737371a;
      }

      .col {
        padding: rem-calc(10px) 0;
      }
    }
  }
}
</style>
