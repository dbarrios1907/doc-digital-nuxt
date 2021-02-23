<template>
  <div :items="items" :class="['v-tabs', { 'tab-default': defaultTab }, { 'tab-primary': !defaultTab }]">
    <v-tabs v-model="tab">
      <v-tab v-for="item in items" :key="item.tab" :ripple="false" v-bind="$attrs" v-on="$listeners">
        <div class="tab-header-content">
          <span class="tab-title">{{ item.tab }}</span>
          <div class="tab-number" v-if="item.number > 0 && !defaultTab">{{ item.number }}</div>
        </div>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" :ripple="false">
      <slot name="tab-item" />
    </v-tabs-items>
  </div>
</template>

<script>
import './TabPanel.scss'
export default {
  name: 'DxTabs',
  inheritAttrs: true,
  props: {
    tabtype: String,
    items: Array,
    defaultTab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: null,
    }
  },
  methods: {
    tabTypeClass(tabtype) {
      switch (tabtype) {
        case 'default':
          return 'tab-default'
        case 'primary':
          return 'tab-primary'
      }
    },
  },
}
</script>
