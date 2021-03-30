<template>
<div>
<client-only>
  <div :class="['pdf--preview', 'relative', {'mx-auto': center}, {'ishtml': ishtml},{'iszoom': iszoom}]">
    <iframe :scrolling="!iszoom ? 'no': ''" overflow="hidden" v-if="ishtml" :src="src" />
    <vue-pdf
      ref="pdf"
      :src="src"
      :page="page"
      @progress="loadedRatio = $event"
      @num-pages="numPages = $event"
      @link-clicked="page = $event"
      @page-loaded="currentPage = $event"
      v-else
    ></vue-pdf>
    <v-row class="mt-4" v-if="!ishtml">
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
</div>
</template>
<script>
export default {
  props:{
    center: {type: Boolean},
    src: {type: String, default: ''},
    ishtml: {type: Boolean, default: false},
    iszoom: {type: Boolean, default: false}
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
    },
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
.pdf--preview {
  max-width: 247px;
  height: 443px;
}

.ishtml {
  &.pdf--preview {
    height: 339px;
  }

  .zoom--icon {
    bottom: rem-calc(10px);
  }
}

.iszoom {
  max-width: 940px;
  height: 100vh;
}
 

iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
}
</style>