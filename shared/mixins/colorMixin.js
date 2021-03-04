import Vue from 'vue'
import _get from 'lodash.get'

export const colorMixin = Vue.extend({
  props: {
    color: String,
  },
  computed: {
    _color() {
      return _get(this, `$vuetify.theme.currentTheme.${this.color}`, this.color)
    },
  },
})
