<template>
  <div class="dx-icons-actions d-inline-flex">
    <BackgroundChange class="mr-1" @click="changetheme" />
    <MinusText class="mr-1" @click="minus" />
    <PlusText @click="plus" />
  </div>
</template>

<script>
import { isBrowser } from '~/shared/utils/env'

export default {
  name: 'DxIconsActions',
  inheritAttrs: false,
  data() {
    return {
      count: isBrowser ? parseFloat(document.documentElement.style.getPropertyValue('font-size')) : 16,
    }
  },
  methods: {
    minus() {
      this.count -= 2
      this.setfont()
    },
    plus() {
      this.count += 2
      this.setfont()
    },
    changetheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    call(name) {
      this[name]()
    },
    setfont() {
      if (isBrowser) {
        document.documentElement.style.setProperty('font-size', this.count + 'px')
      }
    },
  },
}
</script>
