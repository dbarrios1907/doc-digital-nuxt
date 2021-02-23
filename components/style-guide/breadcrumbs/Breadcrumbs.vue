<template>
  <div class="d-flex-inline">
    <template v-if="firstItem">
      <span :href="firstItem.href">
        <Vector />
      </span>
      <v-breadcrumbs class="d-inline pl-1 pr-2" :items="items" v-bind="$attrs" v-on="$listeners">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :disabled="item.disabled" :href="item.href" class="primary--text" active-class="darken2--text">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </template>
  </div>
</template>

<script>
import './Breadcrumbs.scss'
export default {
  name: 'DxBreadcrumbs',
  inheritAttrs: false,
  props: {
    items: Array,
  },
  computed: {
    firstItem() {
      return this.items.length > 0 ? this.items[0] : undefined
    },
  },
}
</script>
