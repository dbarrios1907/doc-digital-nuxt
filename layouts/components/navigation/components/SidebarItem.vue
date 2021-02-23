<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <NavListItem v-if="onlyOneChild.meta" link :to="resolvePath(onlyOneChild.path)" :nested="nested">
        <v-list-item-icon>
          <v-icon v-text="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
        </v-list-item-icon>

        <v-list-item-title v-text="onlyOneChild.meta.title" />
      </NavListItem>
    </template>

    <NavListGroup v-else :ripple="false" active-class="light--text" :prepend-icon="item.meta && item.meta.icon" no-action :sub-group="nested">
      <template v-slot:activator>
        <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
      </template>

      <dx-sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" nested />
    </NavListGroup>
  </div>
</template>

<script>
import path from 'path'
import NavListGroup from './NavListGroup'
import NavListItem from './NavListItem'
import { isExternal } from '@/shared/utils/router'

export default {
  name: 'DxSidebarItem',
  components: {
    NavListGroup,
    NavListItem,
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    nested: Boolean,
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>
