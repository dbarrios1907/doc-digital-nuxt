<template>
  <v-navigation-drawer ref="navbar" :color="_color" width="100%" permanent v-bind="$attrs" v-on="$listeners">
    <perfect-scrollbar :style="{ height: scrollHeight }">
      <slot :slot-scope="{}" name="top-section">
        <NavListItem class="mt-8 px-5">
          <v-list-item-icon>
            <v-icon large class="light--text mr-1"> mdi-account </v-icon>
          </v-list-item-icon>

          <v-list-item-title>Trinidad Swinburn Correa</v-list-item-title>
        </NavListItem>

        <DxEntitySelectionItem />

        <div class="py-4" style="display: flex; justify-content: center">
          <dx-button style="background-color: white" large color="primary" text v-bind="$props">
            <span class="underline-text">Nuevo Documento</span>
            <dx-icon right chevron regular> mdi-chevron-down </dx-icon>
          </dx-button>
        </div>
      </slot>
      <slot name="menu">
        <v-list>
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </v-list>
      </slot>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import NavListItem from './components/NavListItem.vue'
import SidebarItem from './components/SidebarItem.vue'
import _get from '@/shared/utils/get'
import DxEntitySelectionItem from '~/layouts/components/navigation/components/EntitySelectionItem'

export default {
  name: 'DxNavigation',
  components: {
    DxEntitySelectionItem,
    NavListItem,
    SidebarItem,
  },
  inheritAttrs: true,
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    scrollHeight: '100%',
  }),
  computed: {
    _color() {
      const isDark = _get(this, `$vuetify.theme.isDark.`)
      return isDark ? '#093F76' : '#093F75'
    },
  },
  watch: {
    '$refs.navbar.scrollHeight'() {
      this.scrollHeight = this.$refs.navbar.scrollHeight + 'px'
    },
  },
  mounted() {
    this.scrollHeight = this.$refs.navbar.scrollHeight + 'px'
  },
}
</script>

<style lang="scss">
.v-navigation-drawer__content {
  overflow: hidden;
}
</style>
