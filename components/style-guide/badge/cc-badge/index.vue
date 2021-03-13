<template>
  <dx-badge type="primary" small :style="ccStyle" v-bind="$attrs" v-on="$listeners"> cc </dx-badge>
</template>

<script>
export default {
  name: 'CcBadge',
  inheritAttrs: false,
  data: () => ({
    ccStyle: {
      padding: '0 9px !important',
      height: '24px !important',
      lineHeight: '20px !important',
    },
  }),
}
</script>
