<template>
  <div class="mx-0">
    <div v-for="(item, index) of items" :key="index">
      <div class="mx-0 mb-4 carditem">
        <v-row class="carditem--header" no-gutters>
          <v-col class="font-14 deepdark--text weight-700 px-5 py-3">Grupo {{ index + 1 }} de firmas </v-col>
        </v-row>
        <v-row class="my-3" no-gutters>
          <v-col cols="6" class="pl-5">
            <div class="font-small deepdark--text weight-700">{{ item.asignadoNombre }}</div>
            <div class="font-small">{{ item.entidadNombre }}</div>
          </v-col>
          <v-col cols="6" class="pr-5 text-right">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    items: Array,
  },
}
</script>
<style lang="scss" scoped>
@include theme(row) using($material) {
  $primary-color: map-deep-get($material, 'colors', 'primary');

  &.carditem--header {
    background-color: #ddd;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
}

.carditem {
  border: 1px solid #dddddd;
  border-radius: 5px;
}
</style>
