<template>
  <v-rating color="primary" background-color="primary" half-increments hover dense :ripple="false" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'DxRatings',
  inheritAttrs: false,
}
</script>
