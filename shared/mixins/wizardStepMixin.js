import Vue from 'vue'

export const wizardStepMixin = Vue.extend({
  methods: {
    validate() {
      return this.$refs.observer.validate()
    },
    clear(defaultValues) {
      Object.assign(this, defaultValues || this.defaultValues)
      this.$refs.observer.reset()
    },
  },
})
