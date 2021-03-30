<template>
  <v-autocomplete
    v-bind="$attrs"
    :ripple="false"
    solo
    flat
    outlined
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
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
  name: 'SingleSelectionAutocomplete',
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
    multiple: {
      type: Boolean,
      default: false,
    },
    mock: Boolean,
    fetchUrl: {
      type: String,
      default: 'https://api.coingecko.com/api/v3/coins/list',
    },
    fetchAction: String,
    fetchParams: {
      type: Object,
      default: () => ({}),
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
      this.fetchData(val)
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    removeItem(item) {
      this.$emit('onRemoveItem', item, this.itemValue)
    },
    fetchData(val) {
      const promise = this.mock ? fetch(this.fetchUrl) : this.$store.dispatch(this.fetchAction, this.fetchParams)
      return promise
        .then(res => res.clone().json())
        .then(res => {
          this.items = res
        })
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>
