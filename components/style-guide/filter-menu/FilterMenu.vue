<template>
  <div :items="items" class="dx-filtermenu">
    <!-- <Badge v-for="sel in selected" :key="sel" type="tertiary" label outlined small link class="dx-filemenu ml-0 my-1"> {{ sel }} </Badge> -->

    <dx-button color="darken3" outlined @click="toogleOptions">
      <div class="text-underline float-left">{{ label }}</div>
      <dx-icon right regular class="text-right float-right"> mdi-filter </dx-icon>
    </dx-button>
    <div v-show="toggled" ref="menulist" class="list-items-content mt-2" @focusout="focusout">
      <div v-for="item in items" :key="item">
        <v-checkbox v-model="selected" :label="item" :value="item" :ripple="false" @change="emitSelected" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DxFiltermenu',
  inheritAttrs: true,
  props: {
    items: Array,
    label: {
      type: String,
      default: 'Filtro',
    },
  },
  data() {
    return {
      toggled: false,
      selected: [],
    }
  },
  computed: {
    isTootgled() {
      return this.toggled
    },
  },
  methods: {
    toogleOptions() {
      this.toggled = !this.toggled
      // if (this.$refs.menulist.$el.focus() == true) {
      //   this.toggled = true
      // }
    },
    focusout(e) {},
    emitSelected() {
      this.$emit('get-selected', this.selected)
    },
  },
}
</script>

<style lang="scss">
@include theme(v-application--wrap) using($material) {
  $text-color: map-deep-get($material, 'v_filtermenu', 'darken3');
  $light: map-deep-get($material, 'v_filtermenu', 'light');
  .dx-filtermenu {
    width: 100% !important;
    position: relative;
    .v-btn {
      width: 100% !important;
      height: 48px !important;
    }
    .v-btn__content {
      justify-content: normal !important;
    }
    .v-btn > .v-btn__content i.v-icon {
      font-size: rem-calc(24px) !important;
      position: absolute;
      right: 0;
      top: 3px;
    }
    .list-items-content {
      border: 1px solid !important;
      padding: 0px 12px !important;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
      position: absolute;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      contain: content;
      will-change: transform;
      background-color: $light;
      z-index: 1;
    }
    .v-input--selection-controls {
      margin-top: 12px !important;
    }
    .v-input {
      padding: 0px 0px 0 0 !important;
      height: 36px !important;
      margin-bottom: 16px !important;
    }
    .v-label {
      color: $text-color !important;
    }
    .theme--light.v-icon {
      color: $text-color;
    }
  }
  .dx-filemenu.v-chip.tertiary {
    padding: 13px 20px !important;
    height: 48px !important;
    max-width: 300px !important;
    font-weight: 700 !important;
    margin-right: 10px;
    float: left !important;
  }
}
</style>
