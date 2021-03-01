<template>
  <v-app-bar dx-header fixed tile app elevation="0" class="dark" v-bind="$attrs" v-on="$listeners">
    <div class="d-flex container container--fluid px-0 py-0">
      <HeaderLogo />

      <div class="text-right ml-auto mt-auto mb-auto" style="height: auto">
        <dx-button color="light" text v-bind="$props">
          <dx-icon left>mdi-help-circle</dx-icon>
          <span class="pl-1 text-underline">Ayuda</span>
        </dx-button>
        <dx-button class="white--text text-underline mr-4" color="primary"> Cerrar Sesión</dx-button>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'DxHeader',
  inheritAttrs: false,
}
</script>

<style lang="scss">
$dx-header-height: 92px !important;
[dx-header] {
  height: $dx-header-height;
  .v-toolbar__content {
    height: $dx-header-height;
    padding: 0;
  }
}
</style>
