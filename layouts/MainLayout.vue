<template>
  <div class="main-layout">
    <header :class="{ 'd-flex': hasHeaderSlot }">
      <slot name="header">
        <div class="dark light--text text-h3 weight-400 px-4 py-4">header</div>
      </slot>
    </header>

    <slot name="main">
      <div class="light dark--text text-h2 weight-600 px-4 py-4">Main Content</div>
    </slot>

    <footer>
      <slot name="footer">
        <div class="dark light--text text-h6 px-4 py-2">Footer</div>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DxMainLayout',
  inheritAttrs: false,
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header
    },
  },
}
</script>

<style>
.main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  left: 0;
}

.main-layout header {
  height: 90px;
}

.main-layout main {
  flex: 1 1 auto;
}

.main-layout footer {
  height: 58px;
}

.main-layout main > div,
.main-layout header > div,
.main-layout footer > div {
  height: 100%;
  max-height: 100%;
}
</style>
