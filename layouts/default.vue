<template>
  <v-app class="dark">
    <div class="dx-notification-container" />
    <dx-navigation v-model="drawer" :routes="routes" :clipped="clipped" fixed app @onmouseover="onMouseOver" @mouseleave="onMouseLeave" />

    <dx-header :clipped-left="clipped" fixed app elevation="0" :height="92" />
    <v-main app>
      <perfect-scrollbar name="scrollMain" :class="[{ 'max-height-522': ismobil }]">
        <v-container fluid class="py-8 px-10">
          <nuxt />
        </v-container>
      </perfect-scrollbar>
    </v-main>

    <dx-footer :absolute="!fixed" class="px-0 py-0" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      clipped: true, // toggles nav full height
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      lockBodyScroll: false,
      title: 'Vuetify.js',
    }
  },

  computed: {
    ...mapState(['routes']),
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
  },
  methods: {
    onMouseOver() {
      this.lockBodyScroll = true
      console.log(this.lockBodyScroll)
    },
    onMouseLeave() {
      this.lockBodyScroll = false
    },
  },
}
</script>
<style lang="scss">
.max-height-522 {
  max-height: 522px !important;
}
</style>
