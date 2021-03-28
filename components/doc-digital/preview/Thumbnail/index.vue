<template>
<client-only>
  <div :style="{maxWidth: maxWidth}" :class="['relative', {'mx-auto': center}]">
    <vue-pdf
      ref="pdf"
      src="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf"
      :page="page"
      @progress="loadedRatio = $event"
      @num-pages="numPages = $event"
      @link-clicked="page = $event"
      @page-loaded="currentPage = $event"
    ></vue-pdf>
    <v-row class="mt-4">
      <v-col cols="2" class="text-left">
        <dx-icon class="darken1--text" right regular v-if="page == 1">mdi-chevron-left </dx-icon>
        <dx-icon right regular @click="back" v-else> mdi-chevron-left </dx-icon>
      </v-col>
      <v-col cols="8" class="text-center">{{ currentPage }} - {{ numPages }} de {{ numPages }}</v-col>
      <v-col cols="2" class="text-right">
        <dx-icon class="darken1--text" right regular v-if="currentPage == numPages">mdi-chevron-right </dx-icon>
        <dx-icon right regular @click="next" v-else> mdi-chevron-right </dx-icon>
      </v-col>
    </v-row>
    <div class="zoom--icon" aria-controls>
      <slot name="zoom"/>
    </div>
  </div>
</client-only>
</template>
<script>
export default {
  props:{
    maxWidth: {type: String, default: '247px'},
    center: {type: Boolean},
  },
  data: () => ({
    loadedRatio: 0,
    page: 1,
    numPages: 0,
    rotate: 0,
    currentPage: 0,
    isClient: process.client
  }),
  methods: {
    next() {
      this.page += 1
    },
    back() {
      this.page -= 1
    }
  },
}
</script>
<style lang="scss" scoped>
.relative{
  position: relative;
}
.zoom--icon {
  position: absolute;
  right:rem-calc(10px);
  bottom: rem-calc(75px);
}
</style>