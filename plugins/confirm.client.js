import Vue from 'vue'

Vue.prototype.$confirmInstance = function () {
  return this.$root?.$children?.find(v => v._name === '<RootLayout>').$refs.$confirm
}
