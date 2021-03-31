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
        <v-list-item-subtitle v-text="item[itemSubtitle]" />
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
      default: 'Filtrar listado usuarios',
    },
    closableItems: {
      type: Boolean,
      default: true,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemSubtitle: {
      type: String,
      default: 'symbol',
    },
    itemValue: {
      type: String,
      default: 'symbol',
    },
    mock: Boolean,
    fetchUrl: {
      type: String,
      default: 'https://api.coingecko.com/api/v3/coins/list',
    },
    fetchAction: {
      type: String,
      default: 'usuarios/fetchUsers',
    },
    fetchParams: {
      type: Object,
      default: () => ({}),
    },
    searchProp: {
      type: String,
      default: 'nombre',
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
      clearTimeout(this.timeout)
      // Lazily load input item
      this.timeout = setTimeout(() => {
        this.isLoading = true
        this.fetchData(val)
      }, 250)
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
      const promise = this.mock
        ? fetch(this.fetchUrl)
            .then(res => res.clone().json())
            .then(res => (this.items = res))
        : this.$store.dispatch(this.fetchAction, { ...this.fetchParams, [this.searchProp]: val }).then(res => {
            console.log(res)
            this.items = res || []
          })
      return promise.finally(() => (this.isLoading = false))
    },
  },
}
</script>
