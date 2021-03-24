import Vue from 'vue'

export const responsiveMixin = Vue.extend({
  computed: {
    _isTablet() {
      return this.$vuetify.breakpoint.md || this._isMobile
    },
    _isMobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    _isSmall() {
      return this.$vuetify.breakpoint.xs
    },
  },
})
