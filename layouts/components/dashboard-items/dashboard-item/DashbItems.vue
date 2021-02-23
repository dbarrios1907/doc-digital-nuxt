<template>
  <div>
    <div class="mx-auto px-0 primary--text" elevation="0">
      <div class="font-xxlarge weight-500 line-height-42 my-1 primary--text">{{ textheader }}</div>
      <div class="py-2 px-0 break-word">
        <div class="font-xlarge weight-500 primary--text">{{ titleheader }}</div>
      </div>
      <div v-if="!hidecontent" class="py-2 px-1 mt-3 pr-4 col-12">
        <div v-if="messaje === ''" class="px-1 text-subtitle-2 mt-5" />
        <div v-else class="px-1 text-subtitle-2 red white--text text-caption text-center font-16 weight-normal line-height-24 rounded-xl">
          {{ messaje }}
        </div>
      </div>
      <div class="px-0">
        <dx-button color="regular" text class="pl-0 my-2">
          <dx-icon left> mdi-arrow-right </dx-icon>
          <span class="text-underline line-height-24" :class="actionColor"> Ir al detalle </span>
        </dx-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DxDashbitem',
  props: {
    color: String,
    textheader: String,
    titleheader: String,
    messaje: String,
    href: String,
    hidecontent: String,
  },
  computed: {
    textColor() {
      const isDark = this.$vuetify.theme.dark
      return this.$vuetify.theme.themes[isDark ? 'dark' : 'light'].darken3
    },
    actionColor() {
      const isDark = this.$vuetify.theme.dark
      return isDark ? '' : 'deepblue'
    },
  },
}
</script>

<style scoped>
.break-word {
  word-break: break-word !important;
}
.deepblue {
  color: #001c41 !important;
}
.font-16 {
  font-size: 16px !important;
  font-weight: normal !important;
  line-height: 24px !important;
  max-width: 81%;
}
</style>
