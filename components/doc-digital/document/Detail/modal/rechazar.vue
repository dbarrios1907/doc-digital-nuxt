<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="600px" v-on="$listeners" v-bind="$attrs">
      <v-card>
        <v-card-title>
          <h5 class="font-title weight-700 darken3--text">Rechazar documento</h5>
          <v-spacer />
          <v-btn color="darken3" icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="darken1" />

        <v-form ref="form" @submit.prevent="">
          <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text py-10 px-10">
            <div class="font-title line-height-30 mb-6">Para rechazar el documento escriba el motivo</div>
            <div>
              <span>Motivo del rechazo *</span>
              <validation-provider v-slot="{ errors }" name="otp" rules="required">
                <v-textarea
                  :error-messages="errors"
                  v-model="rechazo"
                  no-resize
                  rows="4"
                  outlined
                  :maxlength="limitmaxCount"
                  @input="updatefield('rechazo', $event)"
                >
                  <template v-slot:append>
                    <div class="count darken3--text">{{ desclength }}/{{ limitmaxCount }}</div>
                  </template>
                </v-textarea>
              </validation-provider>
            </div>
          </v-card-text>

          <v-card-actions class="px-10">
            <v-spacer />
            <dx-button color="primary" outlined class="text-none" @click="cancel">
              <span class="text-underline"> Cancelar </span>
            </dx-button>
            <dx-button color="primary" class="text-none ml-5" @click="sign" :disabled="invalid">
              <span class="text-underline"> Rechazar </span>
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
        this.close()
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
      rechazo: '',
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
      this.$store.dispatch('documents/fetchDocumentSign', { otp: 0, params: { tareaId: this.docid, comentarios: this.rechazo, isRechazada: true } })
      this.close()
    },
  },
  computed: {
    desclength() {
      return this.rechazo ? this.rechazo.length : 0
    },
  },
}
</script>
