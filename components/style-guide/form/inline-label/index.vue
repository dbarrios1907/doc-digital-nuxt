<template>
  <label :style="_styles" :class="defaultsClasses" v-bind="$attrs" v-on="$listeners"><slot /></label>
</template>

<script>
export default {
  name: 'InlineLabel',
  props: {
    minWidth: {
      type: String,
      default: () => '140px',
    },
  },
  data: () => ({
    defaultsClasses: 'd-flex-inline font-20 line-height-22',
  }),
  computed: {
    _styles() {
      return {
        minWidth: this.minWidth,
        maxWidth: this.minWidth,
      }
    },
  },
}
</script>
