<template>
  <dx-select ref="wrapped" v-bind="$attrs" item-text="name" item-value="id" v-on="$listeners">
    <template v-slot:item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" :ripple="false" v-on="on">
        <v-list-item-content>
          <v-list-item-title :id="attrs['aria-labelledby']" :title="item.name" v-text="item.name" />
        </v-list-item-content>

        <v-list-item-action
          class="ml-2 mr-0 my-0 flex-row align-center"
          :style="{
            marginRight: '0 !important',
          }"
        >
          <cc-plus-icon v-if="cc" @click="onCCAddItem($event, item)" />

          <v-btn
            v-if="add"
            activatable
            class="list-item-btn px-0 py-0 ml-1 primary--text line-height-18"
            text
            rounded
            elevation="0"
            @click="onAddItem($event, item)"
          >
            <v-icon style="font-size: 24px !important">mdi-plus-circle-outline</v-icon>
          </v-btn>

          <v-btn
            v-if="edit"
            activatable
            class="list-item-btn px-0 py-0 ml-1 primary--text line-height-18"
            text
            rounded
            elevation="0"
            @click="onEditItem($event, item)"
          >
            <v-icon style="font-size: 24px !important">mdi-square-edit-outline</v-icon>
          </v-btn>

          <v-btn
            v-if="remove"
            activatable
            class="list-item-btn px-0 py-0 ml-1 primary--text line-height-18"
            text
            rounded
            elevation="0"
            @click="onRemoveItem($event, item)"
          >
            <v-icon style="font-size: 24px !important">mdi-delete-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>

    <template v-slot:selection="{ item }">
      <dx-badge type="tertiary" label outlined class="mx-1 my-1">
        <div class="darken3--text font-16 line-height-22 weight-400">{{ item.name }}</div>
        <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem($event, item)"> mdi-close </dx-icon>
      </dx-badge>
    </template>
  </dx-select>
</template>

<script>
export default {
  name: 'CcSelect',
  inheritAttrs: false,
  props: {
    cc: Boolean,
    add: Boolean,
    edit: Boolean,
    remove: Boolean,
  },
  methods: {
    emitSelected() {
      this.$emit('get-selected', this.value)
    },
    removeItem(e, item) {
      e.stopPropagation()
      console.log(this.$refs.wrapped)
      this.$refs.wrapped.removeItem(item.id)
    },
    preventDefault(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onCCAddItem(e, item) {
      this.preventDefault(e)
      this.$emit('onAddItem', item)
    },
    onAddItem(e, item) {
      this.preventDefault(e)
      this.$emit('onAddItem', item)
    },
    onEditItem(e, item) {
      this.preventDefault(e)
      this.$emit('onAddItem', item)
    },
    onRemoveItem(e, item) {
      this.preventDefault(e)
      this.$emit('onAddItem', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item-btn {
  height: auto !important;
  min-width: auto !important;
}
</style>
