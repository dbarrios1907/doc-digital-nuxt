<template>
  <div class="dx-alert d-flex justify-content-center elevation-8" :class="'dx-type__' + type" v-bind="$listeners">
    <div class="dx-alert__wrapper d-inline-flex align-center py-3">
      <span class="d-flex px-5" v-if="showLeftIcon">
        <component :is="iconByType" />
      </span>

      <div class="dx-alert__content font-large d-inline flex-fill pr-12">
        <div v-if="title !== null && title !== undefined && title !== ''" class="dx-alert-title font-large weight-500">{{ title }}</div>
        <div class="vn-message"><slot /></div>
      </div>
    </div>
    <span v-if="showRightIcon" class="dx-alert__closeable d-flex px-1 py-1" @click="dismiss">
      <alert-close-icon />
    </span>
  </div>
</template>

<script>
export default {
  name: 'DxAlert',
  inheritAttrs: false,
  props: {
    message: String,
    type: String,
    title: String,
    showLeftIcon: {
      type: Boolean,
      default: true,
    },
    showRightIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    iconByType() {
      if (this.$props.type === 'info') {
        return 'alert-info-icon'
      }

      if (this.$props.type === 'warning') {
        return 'alert-warning-icon'
      }

      if (this.$props.type === 'success') {
        return 'alert-success-icon'
      }

      if (this.$props.type === 'error') {
        return 'alert-error-icon'
      }

      return false
    },
  },
  methods: {
    dismiss() {
      console.log('DISMISS')
      this.$emit('onDismiss')
    },
  },
}
</script>
<style lang="scss">
.dx-alert {
  max-width: 27.37rem;
  position: relative;
  border-width: 2px;
  border-style: solid;
}

.dx-alert__closeable {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

@function bg_color($colorName) {
  @if $colorName == success {
    @return #dbf2f0;
  }

  @if $colorName == info {
    @return #f3f7fc;
  }

  @if $colorName == error {
    @return #fdf4f4;
  }

  @if $colorName == warning {
    @return #fef8f2;
  }

  @return #f3f7fc;
}

@include theme(dx-alert) using($material) {
  $dx-alert-color: map-deep-get($material, 'colors', 'darken3') !important;

  .dx-alert__content {
    color: $dx-alert-color;
  }

  @each $name, $color in map-get($material, 'alerts') {
    &.dx-type__#{$name} {
      color: $color;
      background-color: bg_color(#{$name}) !important;
      border-color: $color !important;
    }
  }
}
</style>
