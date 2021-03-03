<template>
  <v-btn elevation='0' v-bind='$attrs' v-on='$listeners' color='white' class='dx-button-icon' :ripple="false">
    <svg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fill-rule='evenodd' clip-rule='evenodd'
            d='M17.1963 22.048L16.5838 22.1331V22.8477H18.9489V22.1331L18.325 22.0254L18.8865 20.5054H22.193L22.7375 22.0254L22.1136 22.1331V22.8477H24.4844V22.1331L23.8775 22.048L21.0417 14.5898H20.0832L17.1963 22.048ZM12.9531 18.9323H17.1015V18.1026H12.9531V18.9323ZM19.2325 19.5695L20.537 16.0248H20.571L21.8528 19.5695H19.2325Z'
            fill='#656565' />
      <rect x='0.885' y='0.885' width='36.23' height='36.23' stroke='#656565' stroke-width='1.77' />
    </svg>
  </v-btn>
</template>
<script>
export default {
  name: 'MinusText',
}
</script>
<style scoped>
.dx-button-icon.v-btn {
  min-width: auto;
  padding: 0;
}
</style>
