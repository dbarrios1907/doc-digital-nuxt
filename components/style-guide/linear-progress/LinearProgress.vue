<template>
  <v-progress-linear
    v-model="knowledge"
    color="#0F69C4"
    background-color="#CFE1F3"
    height="25"
    class="neutral--text"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <strong>{{ Math.ceil(knowledge) }}%</strong>
  </v-progress-linear>
</template>

<script>
export default {
  name: 'DxLinearProgress',
  inheritAttrs: false,
}
</script>
