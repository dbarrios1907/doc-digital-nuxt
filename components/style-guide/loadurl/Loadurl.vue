<template>
  <div>
    <div class="b-upload font-large">
      <dx-button color="primary" outlined class="btn-upload" @click="dialog = true">
        <div class="btn-upload-content">
          <dx-icon right regular> mdi-link </dx-icon>
          <span class="text-underline">Cargar URL</span>
        </div>
      </dx-button>
    </div>
    <v-dialog v-bind="$attrs" v-on="$listeners" v-model="dialog" overlay-opacity="0.55" overlay-color="#001C41" max-width="600px">
      <v-card>
        <v-card-title>
          <h5 class="font-title weight-700 darken3--text font-roboto">Agregar url como archivo anexo</h5>

          <v-spacer />
          <v-btn color="darken3" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <p class="text-justify">
              Ingrese una URL como archivo anexo y añada una descripción que la identifique. Puede cargar una URL pública o privada. En este último
              caso, asegúrese que quienes reciban el anexo tengan los accesos pertinentes
            </p>
            <v-row class="mt-3">
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0 mt-3">
                <span>URL:</span>
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="8" class="py-sm-0 px-xs-0">
                <dx-text-field v-model="d_url" flat solo outlined placeholder="Escriba la URL" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0 mt-3">
                <span>Descripción:</span>
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="8" class="py-sm-0 px-xs-0">
                <dx-text-field v-model="d_descripcion" flat solo outlined placeholder="Escriba la descripción" />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="px-lg-10 px-md-10 pb-10 mt-2 d-flex justify-center">
            <v-spacer />
            <dx-button color="primary" outlined class="text-none" @click="cancel">
              <span class="text-underline"> Cancelar </span>
            </dx-button>
            <dx-button color="primary" class="text-none ml-5">
              <span class="text-underline"> Adjuntar </span>
            </dx-button>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { closeableMixin } from '~/shared/mixins/closeableMixin'

export default {
  name: 'Loadurl',
  mixins: [closeableMixin],
  props: {
    url: String,
    descripcion: String,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      d_url: this.url,
      d_descripcion: this.descripcion,
    }
  },
  methods: {
    cancel() {
      this.$emit('onCancel')
      this.$refs.form.reset()
      this.dialog = false
    },
  },
}
</script>
