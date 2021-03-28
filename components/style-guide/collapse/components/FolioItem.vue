<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <v-row>
        <v-col cols="6" class="py-2 px-2">
          <span class="font-15 line-height-29 deepdark--text weight-700">Folio:</span> {{ item.documento.folio }}
        </v-col>
        <v-col cols="6" class="py-2 pr-md-4 pr-lg-4 text-right">
          <div v-if="!item.isCompletada">
            <div class="font-small d-inline-block pr-4">Firma pendiente</div>
            <dx-icon>mdi-clock-time-three-outline</dx-icon>
          </div>

          <div v-else>
            <div class="font-small d-inline-block pr-4">Firmado</div>
            <dx-icon color="primary">mdi-check-circle</dx-icon>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="py-2 px-2">
          <span class="font-15 line-height-29 deepdark--text weight-700">Foliado por:</span> {{ item.ejecutorNombre }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="py-2 px-2">
          <span class="font-15 line-height-29 deepdark--text weight-700">Oficina de Partes que enumera:</span> {{ item.entidadNombre }}
        </v-col>
      </v-row>
      <v-divider class="darken1 my-4" v-if="items.length - 1 != index" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'FolioItem',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>
