<template>
  <v-select
    class="icon-select"
    v-model="value"
    :ripple="false"
    v-bind="$attrs"
    :items="items"
    chips
    :label="label"
    persistent-hint
    outlined
    solo
    flat
    :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
    v-on="$listeners"
    required
    @change="emitSelected"
  >
    <template v-slot:selection="{ item }">
      <span>{{ item }}</span>
    </template>
    <template v-slot:item="{ item }" class="custom-items">
      <div class="menu-item">
        <span>{{ item }}</span>
        <dx-icon right chevron regular> mdi-chevron-down </dx-icon>
      </div>
    </template>
  </v-select>
</template>

<script>
// import './Select.scss'
export default {
  name: 'DxIconselect',
  inheritAttrs: false,
  props: {
    label: String,
    items: Array,
  },
  data() {
    return {
      value: [],
    }
  },
  methods: {
    emitSelected() {
      this.$emit('get-selected', this.value)
    },
  },
}
</script>
<style lang="scss">
@include theme(v-select) using($material) {
  $darken3: map-deep-get($material, 'colors', 'darken3');
  $primary: map-deep-get($material, 'colors', 'primary');
  &.icon-select {
    .v-list-item--link:before {
      background-color: $primary !important;
    }
  }
}
</style>
