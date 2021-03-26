<template>
  <v-select
    :ripple="false"
    v-bind="$attrs"
    :items="items"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    persistent-hint
    outlined
    solo
    flat
    :multiple="multiple"
    :menu-props="{ bottom: true, offsetY: true, openOnClick: false }"
    :closable-iems="closableItems"
    :rules="rules"
    :required="required"
    :disabled="disabled"
    v-on="$listeners"
    @change="emitSelected"
  >
    <template v-if="multiple" v-slot:selection="{ item }">
      <dx-badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item[itemText] || item }}</div>
        <dx-icon v-if="closableItems" left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
      </dx-badge>
    </template>

    <template v-slot:item="{ item, on, attrs }">
      <v-list-item :ripple="false" v-bind="attrs" v-on="on">
        <template v-slot:default="{ active }">
          <v-list-item-action v-if="multiple" class="my-1">
            <v-checkbox :dark="active" :input-value="active" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title :id="attrs['aria-labelledby']" :title="item[itemText] || item" v-text="item[itemText] || item" />
          </v-list-item-content>
        </template>
      </v-list-item>
    </template>

    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope" /></template>
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
    itemText: {
      type: String,
      default: 'name',
    },
    itemValue: {
      type: String,
      default: null,
    },
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
  },
  data() {
    return {
      // value: [],
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
