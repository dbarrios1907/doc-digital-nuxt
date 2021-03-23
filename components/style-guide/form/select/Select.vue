<template>
  <v-select
    v-model="value"
    :ripple="false"
    v-bind="$attrs"
    :items="items"
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
    :disabled="disabled"
  >
    <template v-if="multiple" v-slot:selection="{ item }">
      <dx-badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item.name }}</div>
        <dx-icon v-if="closableItems" left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
      </dx-badge>
    </template>

    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
  </v-select>
</template>

<script>
import './Select.scss'
export default {
  name: 'DxSelect',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    selectedValues:{
      type: Array,
      default: [],
    }
  },
  beforeMount(){
    console.log(this.selectedValues)
    this.value = this.selectedValues
  },
  watch:{
    'props.selectedValues': {
        handler: function (after, before) {
           this.value = this.selectedValues
        },
        deep: true
    }
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
        return item.id !== val
      })
    },
  },
}
</script>
