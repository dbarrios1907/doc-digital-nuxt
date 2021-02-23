<template>
  <v-btn dx-button elevation="0" retain-focus-on-click :ripple="false" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<script>
import './Button.scss'
export default {
  name: 'DxButton',
  inheritAttrs: false,
}
</script>
