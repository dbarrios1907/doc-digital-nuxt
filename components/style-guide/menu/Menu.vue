<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <dx-button color="dark" v-bind="attrs" v-on="on">
          <span class="text-underline">
            <span class="underline-text">{{ label }}</span></span
          >
          <dx-icon right regular> mdi-chevron-down </dx-icon>
        </dx-button>
      </template>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'DxMenu',
  inheritAttrs: true,
  props: {
    label: String,
  },
  data() {
    return {
      tab: null,
    }
  },
}
</script>
