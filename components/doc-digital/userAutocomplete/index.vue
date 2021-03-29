<template>
  <v-autocomplete
    v-bind="$attrs"
    :ripple="false"
    solo
    flat
    multiple
    outlined
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    chips
    hide-details
    hide-selected
    :item-text="itemText"
    :item-value="null"
    :label="label"
    v-on="$listeners"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          {{ listLabel }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attr, on, item }">
      <dx-badge type="tertiary" label outlined class="mx-1 my-1">
        <v-avatar v-if="item.avatar" left>
          <v-img :src="item.avatar" />
        </v-avatar>
        <div :title="item[itemText]" class="darken3--text font-16 line-height-22 weight-400 overflow-ellipsis" style="max-width: calc(100% - 30px)">
          {{ item[itemText] }}
        </div>
        <dx-icon v-if="closableItems" left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
      </dx-badge>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar color="primary" class="headline font-weight-light white--text">
        {{ item[itemText].charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item[itemText]" />
        <v-list-item-subtitle v-text="item[itemValue]" />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'UserAutocomplete',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: 'Buscar usuarios ...',
    },
    listLabel: {
      type: String,
      default: 'Escriba al menos 4 caracteres para buscar',
    },
    closableItems: {
      type: Boolean,
      default: true,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemValue: {
      type: String,
      default: 'symbol',
    },
    fetchUrl: {
      type: String,
      default: 'https://api.coingecko.com/api/v3/coins/list',
    },
  },
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),
  watch: {
    model(val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      // Lazily load input items
      fetch(this.fetchUrl)
        .then(res => res.clone().json())
        .then(res => {
          this.items = res
        })
        .finally(() => (this.isLoading = false))
    },
  },
  methods: {
    removeItem(item) {
      this.$emit('onRemoveItem', item, this.itemValue)
    },
  },
}
</script>
