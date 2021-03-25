<template>
  <v-autocomplete
    v-model="values"
    :items="items"
    :label="label"
    :multiple="multiple"
    solo
    outlined
    v-bind="$attrs"
    :disabled="disabled"
    item-text="name"
    item-value="id"
    no-data-text="No existen coincidencias"
    v-on="$listeners"
    @change="emitSelected"
  >
    <template v-if="multiple" v-slot:selection="{ item }">
      <dx-badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item.name }}</div>
        <dx-icon v-if="closableItems" left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item.id)"> mdi-close </dx-icon>
      </dx-badge>
    </template>
  </v-autocomplete>
</template>

<script>
import './Select.scss'
export default {
  name: 'DxSelectAutocomplete',
  inheritAttrs: true,
  props: {
    items: {
      type: Array,
      defalut: [],
    },
    closableItems: {
      type: Boolean,
      default: false,
    },
    label: String,
    rules: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    searchfunct: Function,
  },
  data() {
    return {
      values: [],
      isLoading: false,
    }
  },
  methods: {
    emitSelected() {
      this.$emit('get-selected', this.values)
    },
    removeItem(item) {
      this.values = this.values.filter(function (val) {
        return item !== val
      })
    },
  },
}
</script>
