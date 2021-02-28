<template>
  <v-select
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
    :multiple="multiple"
    :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
    :closable-iems="closableItems"
    v-on="$listeners"
    :rules="rules"
    :required="required"
    @change="emitSelected"
  >
    <template v-if="multiple" v-slot:selection="{ item }">
      <Badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item }}</div>
        <dx-icon v-if="closableItems" left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
      </Badge>
    </template>
  </v-select>
</template>

<script>
import './Select.scss'
export default {
  name: 'DxSelect',
  inheritAttrs: false,
  props: {
    closableItems: {
      type: Boolean,
      default: false,
    },
    label: String,
    items: Array,
    rules: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
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
    removeItem(item) {
      this.value = this.value.filter(function (val) {
        return item !== val
      })
    },
  },
}
</script>
