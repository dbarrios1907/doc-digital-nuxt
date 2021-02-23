<template>
  <div class="content-layout d-flex fill-height overflow-hidden">
    <nav class="dx-navbar">
      <slot v-if="navbar" class="dx-content-navbar" name="navbar" />
    </nav>

    <section class="content-wrapper flex-col flex-fill px-12 pt-12 pb-10 overflow-hidden fill-height">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <slot name="content">
            <div class="px-5 py-4">
              <nuxt :key="key" />
            </div>
          </slot>
        </keep-alive>
      </transition>
    </section>

    <slot v-if="asidebar" name="asidebar" />
  </div>
</template>

<script>
export default {
  name: 'DxContentLayout',
  inheritAttrs: false,
  props: {
    navbar: {
      type: Boolean,
      default: true,
    },
    asidebar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header
    },
    cachedViews() {
      return []
      // return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss" scoped>
$navbar-width: 325px;
$min-navbar-width: 280px;

.ps {
  height: inherit;
}
.dx-navbar {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: $navbar-width;
  max-width: $navbar-width;
  min-width: $min-navbar-width;
  transition: width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, min-width 200ms cubic-bezier(0.4, 0, 0.6, 1);
}

.dx-content-wrapper {
  flex: 1 1 auto;
  flex-direction: column;
}
</style>
