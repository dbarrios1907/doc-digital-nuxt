// SSR safe client-side ID attribute generation
// ID's can only be generated client-side, after mount
import Vue from 'vue'
import { id, hash } from '../utils/hash'

const COMPONENT_UID_KEY = '_uid'
// --- Props ---

export const props = {
  id: {
    type: String,
  },
}

// @vue/component
export const idMixin = Vue.extend({
  props,
  data: () => ({
    _uuid: null,
  }),
  computed: {
    safeId() {
      return this.id || this._uuid
    },
  },
  beforeMount() {
    // `mounted()` only occurs client-side
    this.$nextTick(() => {
      // Update DOM with auto-generated ID after mount
      // to prevent SSR hydration errors
      this._uuid = `_dx_${hash(id())}`
    })
  },
})
