<template>
  <v-dialog overlay-opacity="0.55" overlay-color="#001C41" max-width="950px" v-on="$listeners" v-bind="$attrs">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">Previsualización de documentos</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="darken1" />

      <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text">
        <perfect-scrollbar :style="{ height: '500px' }">
          <PreviewThumbnail maxWidth="850px" center :src="src"/>
        </perfect-scrollbar>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <dx-button color="primary" class="text-none" @click="close">
          <span class="text-underline"> Cerrar </span>
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
    src: {type:String, default: ''},
  },
  methods: {
    close() {
      this.$emit('onClose')      
    },
  },
}
</script>
