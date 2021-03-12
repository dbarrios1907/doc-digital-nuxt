<template>
  <p :class="defaultsClasses" v-bind="$attrs" v-on="$listeners"><slot /></p>
</template>

<script>
export default {
  name: 'DxSmallDescription',
  inheritAttrs: true,
  data: () => ({
    defaultsClasses: 'font-small line-height-20 py-1',
  }),
}
</script>
