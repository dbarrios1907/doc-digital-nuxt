<template>
  <div dx-scrollbar class="dx-scrollbar" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DxScrollbar',
  inheritAttrs: false,
}
</script>

<style scoped lang="scss">
.dx-scrollbar {
  overflow-y: auto;
  position: relative;
}

.dx-scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 3px 0;
}

.dx-scrollbar::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.dx-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparentize(gray, 0.1);
  border-radius: 10px;
}

.scrollbar-sm-hidden {
  @media screen and (max-width: #{map_get($grid-breakpoints, "sm")}) {
    overflow: hidden;
  }
}
</style>
