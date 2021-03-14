<template>
  <div>
    <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Fecha de creación:</span> {{ item.fecha }}</div>
    <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Creador:</span> {{ item.creador }}</div>
    <div class="font-15 line-height-29"><span class="deepdark--text weight-700">Institución creadora:</span> {{ item.entidad }}</div>
  </div>
</template>
<script>
export default {
  name: 'BlockItem',
  inheritAttrs: false,
  props: {
    item: {
      fecha: String,
      creador: String,
      entidad: String,
    },
  },
}
</script>
