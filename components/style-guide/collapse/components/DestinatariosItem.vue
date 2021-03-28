<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <v-row>
        <v-col cols="6" class="py-2 px-2">
          <span class="font-15 line-height-29 deepdark--text weight-700">Institución Destinatario:</span> {{ item.entidadNombre }}
        </v-col>
        <v-col cols="6" class="py-2 pr-md-4 pr-lg-4 text-right">
          <div v-if="!item.isCompletada">
            <div class="font-small d-inline-block pr-4">Recepción: Pendiente</div>
            <dx-icon>mdi-clock-time-three-outline</dx-icon>
          </div>

          <div v-else>
            <div class="font-small d-inline-block pr-4">Recepción: Completada</div>
            <dx-icon color="primary">mdi-check-circle</dx-icon>
          </div>
        </v-col>
      </v-row>
      <v-divider class="primary my-4" v-if="items.length - 1 != index" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'DestinatariosItem',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>
