<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="720px" v-on="$listeners" v-bind="$attrs">
      <v-card>
        <v-card-title>
          <h5 class="font-title weight-700 darken3--text">Firma de documento</h5>
          <v-spacer />
          <v-btn color="darken3" icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="darken1" />

        <v-form ref="form" @submit.prevent="">
          <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text py-10 px-10">
            <div class="font-title line-height-30 mb-6">Para firmar el documento <b> Nombre del documento acá </b> ingresar su OTP.</div>
            <div class="col col-md-8 col-lg-8">
              <span>Código OTP:</span>
              <validation-provider v-slot="{ errors }" name="otp" rules="required|number_not_cero">
                <dx-text-field
                  v-model="otp"
                  flat
                  solo
                  outlined
                  :error-messages="errors"
                  @input="updatefield('otp', $event)"
                  placeholder="Escriba su código OTP"
                />
              </validation-provider>
            </div>
          </v-card-text>

          <v-card-actions class="px-10">
            <v-spacer />
            <dx-button color="primary" outlined class="text-none" @click="cancel">
              <span class="text-underline"> Cancelar </span>
            </dx-button>
            <dx-button color="primary" class="text-none ml-5" @click="sign" :disabled="invalid">
              <span class="text-underline"> Firmar </span>
            </dx-button>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </validation-observer>
</template>
<script>
import { closeableMixin } from '~/shared/mixins/closeableMixin'
export default {
  mixins: [closeableMixin],
  watch: {
    iscancel: {
      handler: function (after, before) {
        this.cancel()
      },
      deep: true,
    },
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    docid: String,
  },
  data() {
    return {
      valid: true,
      limitmaxCount: 255,
      otp: '',
    }
  },
  methods: {
    cancel() {
      this.$emit('onCancel')
      this.close()
    },
    close() {
      this.$emit('onClose')
      this.$refs.form.reset()
    },
    updatefield(key, data) {
      this[key] = data
    },
    sign() {
      this.$store.dispatch('documents/fetchDocumentSign', { otp: this.otp, params: { tareaId: this.docid, comentarios: null, isRechazada: false } })
      this.close()
      //this.cancel()
    },
  },
}
</script>
