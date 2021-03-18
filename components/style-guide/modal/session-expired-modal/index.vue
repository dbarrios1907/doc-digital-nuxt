<template>
  <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="600px" v-bind="$attrs" v-on="$listeners">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text font-roboto">Su sesión ha expirado</h5>

        <v-spacer />
        <v-btn color="darken3" icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="1" class="px-sm-0">
            <v-icon color="primary">mdi-clock-time-five-outline</v-icon>
          </v-col>
          <v-col cols="11" class="px-0 pt-2 pl-1 pr-ext">
            <span class="weight-400 font-roboto font-title line-height-30 darken3--text">
              Por su seguridad, su sesión ha expirado luego de <b class="weight-700">30 minutos de inactividad</b>. Si estaba ingresando un nuevo
              documento, se ha guardado como borrador.
            </span>
          </v-col>
        </v-row>
      </v-card-text>

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
  name: 'DxSessionExpiredModal',
  inheritAttrs: false,
  methods: {
    onClose() {
      this.$emit('onClose', false)
    },
  },
}
</script>
