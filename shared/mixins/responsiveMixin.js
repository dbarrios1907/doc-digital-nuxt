import Vue from 'vue'

export const responsiveMixin = Vue.extend({
  computed: {
    _isMobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
  },
})
