<template>
  <v-select
    :ripple="false"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="value"
    :items="items"
    chips
    :label="label"
    persistent-hint
    outlined
    solo
    flat
    :multiple="multiple"
    :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
    :closableIems="closableIems"
    @change="emitSelected"
  >
    <template v-slot:selection="{ item }" v-if="multiple">
      <Badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item }}</div>
        <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)" v-if="closableIems"> mdi-close </dx-icon>
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
    closableIems: {
      type: Boolean,
      default: false,
    },
    label: String,
    items: Array,
    multiple: {
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
