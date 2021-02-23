import Vue from 'vue'

export const iconSpacingMixing = Vue.extend({
  props: {
    pr: {
      type: Number,
      default: 0,
    },
    pl: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    _spacing() {
      return { paddingRight: this.pr + 'px', paddingLeft: this.pl + 'px' }
    },
  },
})
