<template>
  <v-chip :class="className" :text-color="textColor" :color="bgColor" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-chip>
</template>

<script>
import './Badge.scss'
import clsx from 'clsx'

export const Badge = {
  name: 'DxBadge',
  inheritAttrs: false,
  computed: {
    textColor() {
      if (this.$props.type === 'tertiary') {
        return 'tertiary'
      }

      if (this.$props.type === 'info') {
        return '#0F69C4'
      }

      if (this.$props.type === 'dark') {
        return 'white'
      }

      return null
    },
    bgColor() {
      if (this.$props.type === 'dark') {
        return 'black'
      }

      if (this.$props.type === 'info') {
        return '#CFE1F3'
      }

      return this.$props.type
    },
    className() {
      return clsx('ma-2', { 'badge-link': this.$props.link })
    },
  },
  props: {
    type: String,
    link: Boolean,
  },
}

export default Badge
</script>
