import Vue from 'vue'

export const closeableMixin = Vue.extend({
  methods: {
    onClose() {
      this.$emit('onClose', false)
    },
  },
})
