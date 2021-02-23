<template>
  <v-expansion-panels flat>
    <v-expansion-panel v-for="(item, index) of items" :key="index" active-class="active-collapse-item">
      <v-expansion-panel-header>
        <div class="font-title weight-700">
          {{ item.title }}
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        {{ item.description }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'DxCollapse',
  inheritAttrs: false,
  props: {
    items: Array,
  },
}
</script>
