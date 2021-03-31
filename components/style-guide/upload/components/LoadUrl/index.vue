<template>
  <v-dialog v-model="dialog" v-bind="$attrs" overlay-opacity="0.55" overlay-color="#001C41" max-width="600px" v-on="$listeners" @keydown.esc="cancel">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text font-roboto">{{ title }}</h5>

        <v-spacer />
        <v-btn color="darken3" icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form>
          <v-card-text>
            <p class="text-justify">
              Ingrese una URL como archivo anexo y añada una descripción que la identifique. Puede cargar una URL pública o privada. En este último
              caso, asegúrese que quienes reciban el anexo tengan los accesos pertinentes
            </p>
            <v-row class="mt-5">
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0 mt-3">
                <span>URL:</span>
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="8" class="py-sm-0 px-xs-0">
                <validation-provider v-slot="{ errors }" name="url" rules="required|url">
                  <dx-text-field v-model="form.url" flat solo outlined placeholder="Escriba la URL" required :error-messages="errors" />
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0 mt-3">
                <span>Descripción:</span>
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="8" class="py-sm-0 px-xs-0">
                <dx-text-field v-model="form.descripcion" flat solo outlined placeholder="Escriba la descripción" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-lg-10 px-md-10 pb-10 mt-2 d-flex justify-center">
            <v-spacer />
            <dx-button color="primary" outlined class="text-none" @click="cancel">
              <span class="text-underline"> Cancelar </span>
            </dx-button>
            <dx-button color="primary" :disabled="invalid" class="text-none ml-5" @click="agree">
              <span class="text-underline"> Adjuntar </span>
            </dx-button>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
import { closeableMixin } from '~/shared/mixins/closeableMixin'
import { wizardStepMixin } from '~/shared/mixins/wizardStepMixin'
const defaultValues = () => ({
  url: '',
  descripcion: '',
})
export default {
  name: 'LoadUrl',
  mixins: [closeableMixin, wizardStepMixin],
  props: {
    buttonText: {
      type: String,
      default: 'Cargar URL',
    },
    title: {
      type: String,
      default: 'Agregar url como archivo anexo',
    },
  },
  data: () => ({
    form: defaultValues(),
    dialog: false,
    resolve: null,
    reject: null,
  }),
  methods: {
    open() {
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(this.form)
      this.$refs.observer.reset()
      this.form = defaultValues()
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.$refs.observer.reset()
      this.form = defaultValues()
      this.dialog = false
    },
  },
}
</script>
