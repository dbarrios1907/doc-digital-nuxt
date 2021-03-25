<template>
  <v-navigation-drawer ref="navbar" dx-navigation :color="_color" :width="width" height="100%" v-bind="$attrs" v-on="$listeners">
    <dx-scrollbar>
      <slot :slot-scope="{}" name="top-section">
        <NavListItem class="mt-8 px-5">
          <v-list-item-icon>
            <v-icon large class="light--text mr-1"> mdi-account </v-icon>
          </v-list-item-icon>

          <v-list-item-title>Trinidad Swinburn Correa</v-list-item-title>
        </NavListItem>

        <DxEntitySelectionItem />

        <div class="py-4" style="display: flex; justify-content: center">
          <create-doc-menu />
        </div>
      </slot>
      <slot name="menu">
        <v-list>
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </v-list>
      </slot>
      <template v-if="_isTablet">
        <v-divider class="light my-2 mx-6" />

        <NavListItem>
          <dx-button color="light" text class="my-4">
            <dx-icon left>mdi-help-circle</dx-icon>
            <span class="pl-1 text-underline">Ayuda</span>
          </dx-button>
        </NavListItem>

        <NavListItem>
          <dx-button class="white--text text-underline mb-4 text-right" color="primary" @click="$auth.logout()"> Cerrar Sesión</dx-button>
        </NavListItem>
      </template>
    </dx-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { responsiveMixin } from '~/shared/mixins/responsiveMixin'
import NavListItem from './components/NavListItem.vue'
import SidebarItem from './components/SidebarItem.vue'
import _get from 'lodash.get'
import DxEntitySelectionItem from '~/components/style-guide/layouts/navigation/components/EntitySelectionItem'

export default {
  name: 'DxNavigation',
  components: {
    DxEntitySelectionItem,
    NavListItem,
    SidebarItem,
  },
  mixins: [responsiveMixin],
  inheritAttrs: false,
  props: {
    routes: {
      type: Array,
      default: () => [],
    },

    width: {
      type: String,
      default: () => '325px',
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
      this.scrollHeight = this.$refs.navbar.$el.scrollHeight + 'px'
    },
  },
  mounted() {
    this.scrollHeight = this.$refs.navbar.$el.scrollHeight + 'px'
  },
  methods: {
    onScroll(e) {
      e.preventDefault()
    },
  },
}
</script>

<style lang="scss">
[dx-navigation] {
  max-height: 100% !important;
}
//.v-navigation-drawer__content {
//  overflow: hidden;
//}
</style>
