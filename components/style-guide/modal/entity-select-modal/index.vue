<template>
  <v-dialog
    v-model="dialog"
    overlay-opacity="0.55"
    overlay-color="#001C41"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    persistent
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">{{ title }}</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click.native="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="darken1" />
      <p class="px-5 pt-3">{{ message }}</p>
      <Autocomplete
        v-model="selection"
        :mock="mock"
        fetch-action="usuarios/fetchRelatedUsers"
        :item-text="_itemText"
        class="px-5 pt-3 pb-3"
        list-label="Escriba al menos 3 caracteres para filtrar las entidades"
        label="Seleccionar entidad"
      />

      <v-card-actions class="px-5 justify-center">
        <dx-button color="primary" outlined @click.native="cancel">
          <dx-icon left regular> mdi-close</dx-icon>
          <span class="text-underline">
            <span class="underline-text">{{ options.cancelText }}</span>
          </span>
        </dx-button>

        <dx-button color="primary" @click.native="agree">
          <dx-icon left regular> mdi-check</dx-icon>
          <span class="text-underline">
            <span class="underline-text">{{ options.agreeText }}</span>
          </span>
        </dx-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Autocomplete from '~/components/doc-digital/singleSelectionAutocomplete'

export default {
  name: 'DxEntitySelectModal',
  components: {
    Autocomplete,
  },
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    selection: null,
    mock: false,
    title: 'Seleccione la entidad',
    message:
      'Selecione una de sus entidades para completar su autenticación. Puede cancelar este proceso si desea permanecer en su entidad por defecto',
    options: {
      agreeText: 'Ir a la entidad',
      cancelText: 'Cancelar',
      width: 400,
      zIndex: 200,
    },
  }),
  computed: {
    _itemText() {
      return this.mock ? 'name' : 'entityName'
    },
  },
  methods: {
    open(mock = false) {
      this.dialog = true
      this.mock = mock
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      if (this.selection) {
        this.resolve(this.selection)
        this.dialog = false
      }
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
