<template>
  <header class="dark container container--fluid d-inline-flex px-0 py-0">
    <HeaderLogo />

    <div class="text-right ml-auto mt-auto mb-auto" style="height: auto">
      <dx-button color="light" text v-bind="$props">
        <dx-icon left>mdi-help-circle</dx-icon>
        Ayuda
      </dx-button>
      <dx-button class="white--text text-underline mr-4" color="primary"> Cerrar Sesión</dx-button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  inheritAttrs: false,
}
</script>
