<template>
  <div class="d-flex justify-center align-center px-4 py-2" style="flex-shrink: 0">
    <span class="d-flex-inline text-truncate light--text" style="max-width: 260px">{{ entityName }} </span>
    <CompareArrowsIcon class="ml-2" />
  </div>
</template>

<script>
export default {
  name: 'DxEntitySelectionItem',
  inheritAttrs: true,
  props: {
    entityName: String,
  },
}
</script>
<style></style>
