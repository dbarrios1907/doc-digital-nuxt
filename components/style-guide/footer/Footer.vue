<template>
  <v-footer class="dark" padless>
    <v-col class="text-left py-0 px-0" cols="4">
      <div class="title">
        <span class="font-roboto weight-400 font-small line-height-29" :style="{ color: dcolor }"> Versión 2.1.11 </span>
      </div>
      <BrandWatermark />
    </v-col>

    <v-col class="text-right title2" cols="8">
      <span :style="{ color: dcolor }" class="font-roboto font-small line-height-29 weight-400">
        Para conocer el detalle de la versión actual y actualizaciones anteriores
        <a href="#" class="weight-700" :style="{ color: dcolor }">revise aquí</a>
      </span>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  inheritAttrs: false,
  props: {
    color: String,
  },
  computed: {
    dcolor() {
      if (this.color) return this.color
      return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark.dark : this.$vuetify.theme.themes.light.light
    },
  },
}
</script>
<style scoped>
.title {
  padding: 8px 0 8px 15px;
}

.title2 {
  padding: 9px 15px 18px 0;
}
</style>
