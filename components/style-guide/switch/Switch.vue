<template>
  <v-switch inset dense :ripple="false" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import './Switch.scss'
export default {
  name: 'DxSwitch',
  inheritAttrs: false,
}
</script>
