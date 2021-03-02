<template>
  <div :items="items" :class="['v-tabs', 'tab-' + tabtype]">
    <v-tabs v-model="tab">
      <v-tab v-for="item in items" :key="item.tab" :ripple="false" v-bind="$attrs" v-on="$listeners">
        <div class="tab-header-content">
          <div class="tab-icon" v-if="item.icon">
            <dx-icon>
              {{ item.icon }}
            </dx-icon>
          </div>
          <span class="tab-title">{{ item.tab }}</span>
          <div class="tab-number" v-if="item.number > 0 && tabtype == 'primary'">{{ item.number }}</div>
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
    items: Array,
    tabtype: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      tab: null,
    }
  },
}
</script>
