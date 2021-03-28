<template>
  <v-container class="dx-docprogress">
    <v-row>
      <v-col class="text-center" v-for="(item, index) in items" :key="index">
        <div :class="['icon-container py-2', { done: item.isCompletada }, { pending: !item.isCompletada }, { dissabled: item.disable }]">
          <Pending v-if="!item.isCompletada" />
          <div
            v-else-if="item.isCompletada"
            :class="['mx-auto', { 'done-icon': item.isCompletada && !item.disable }, { 'disable-icon': item.isCompletada && item.disable }]"
          >
            <dx-icon v-if="item.isCompletada && !item.disable">mdi-check</dx-icon>
            <dx-icon v-else>mdi-minus</dx-icon>
          </div>
        </div>
        <div :class="['text-container font-15 line-height-20 weight-400 py-3', { dissabled: item.disable }]">
          {{ item.name }} <br />
          <span v-if="item.disable">(no requiere)</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DxDocprogress',
  inheritAttrs: false,
  props: {
    items: Array,
  },
  methods: {
    translate(item) {
      return {
        CREACION: '1. Inicio de la tramitación',
        VISACION: '2. Visación',
        FIRMA: '3. Firma',
        FOLIO_DESPACHO: '4. Folio y despacho',
        DESTINATARIOS: '5. Destinatarios',
      }[item]
    },
  },
}
</script>
<style lang="scss">
@include theme(container) using ($material) {
  $primary-color: map-deep-get($material, 'colors', 'primary');
  $secondary-color: map-deep-get($material, 'colors', 'secondary');
  $darken3-color: map-deep-get($material, 'colors', 'darken3');
  $light-color: map-deep-get($material, 'colors', 'light');
  $darken1-color: map-deep-get($material, 'colors', 'darken1');
  .dx-docprogress {
    .col {
      padding: 0px;
    }
    .icon-container {
      height: 43px;
      width: 100%;
    }
    .text-container {
      min-height: 45px;
    }
    .done {
      background-color: $primary-color;
    }
    .pending {
      background-color: $secondary-color;
    }
    .done-icon {
      background-color: $light-color;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      .v-icon {
        color: $primary-color !important;
        font-size: rem-calc(15px) !important;
      }
    }
    .disable-icon {
      background-color: $secondary-color;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      .v-icon {
        color: $primary-color !important;
        font-size: rem-calc(15px) !important;
      }
    }
    .dissabled {
      color: #45454566 !important;
    }
  }
}
</style>
