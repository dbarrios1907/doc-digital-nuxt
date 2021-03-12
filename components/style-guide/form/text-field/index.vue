<template>
  <v-text-field solo flat outlined clearable v-bind="$attrs" v-on="$listeners">
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'DxTextField',
  inheritAttrs: false,
}
</script>

<style lang="scss">
@include theme(v-input) using($material) {
  $font-color: map-get($material, 'font-color');
  margin-bottom: 16px;

  & .v-input__control > .v-input__slot {
    min-height: 48px !important;
  }

  .v-text-field__details {
    display: none;
  }

  &.error--text .v-text-field__details {
    display: block;
  }
}
</style>
