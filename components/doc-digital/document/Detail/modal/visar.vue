<template>
  <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="720px" v-on="$listeners" v-bind="$attrs">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">Visar documento</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider class="darken1" />

      <v-card-text class="px-10 py-10">¿Esta seguro que desea visar el documento?</v-card-text>
      <v-card-actions class="py-5">
        <v-spacer />
        <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="cancel">
          <span class="text-underline"> Cancelar </span>
        </dx-button>
        <dx-button color="white" outlined v-bind="$props" class="text-none ml-4 mr-2 primary" @click="visar">
          <span class="text-underline"> Visar </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { closeableMixin } from '~/shared/mixins/closeableMixin'
export default {
  mixins: [closeableMixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    docid: String,
  },
  methods: {
    cancel() {
      this.$emit('onCancel')
      this.close()
    },
    close() {
      this.$emit('onClose')
    },
    visar() {
      this.$store.dispatch('documents/fetchDocumentVisar', this.docid)
      this.close()
    },
  },
}
</script>
