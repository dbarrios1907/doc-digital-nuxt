<template>
  <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="600px" v-bind="$attrs" persistent v-on="$listeners">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">Cerrar sesión</h5>
      </v-card-title>
      <v-divider class="darken1" />

      <v-card-text class="font-roboto weight-400 line-height-30 font-20 darken3--text"> Has cerrado tu sesión. </v-card-text>

      <v-card-actions>
        <v-spacer />
        <dx-button color="primary" outlined v-bind="$props" class="text-none">
          <span class="text-underline"> Ir a DocDigital </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DxSessionClosedModal',
  inheritAttrs: false,
}
</script>
