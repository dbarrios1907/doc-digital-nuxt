<template>
  <div class="text-center">
    <v-progress-circular v-bind="$props" :rotate="180" :size="70" :width="5" v-on="$listeners">
      <span class="font-large weight-600 darken-4" style="color: #373737">{{ value }}%</span>
    </v-progress-circular>
  </div>
</template>
<script>
export default {
  name: 'DxCircularProgress',
  inheritAttrs: false,
}
</script>
