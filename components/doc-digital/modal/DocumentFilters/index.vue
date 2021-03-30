<template>
  <v-dialog
    overlay-opacity="0.55"
    overlay-color="#001C41"
    max-width="960px"
    :fullscreen="_isSmall"
    :hide-overlay="_isSmall"
    v-bind="$attrs"
    dx-modal-document-filters
    v-on="$listeners"
  >
    <v-card style="position: relative; max-height: 100%">
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text">Buscar documento por firmar</h5>
        <v-spacer />
        <v-btn color="darken3" icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="darken1" />
      <perfect-scrollbar :style="{ maxHeight: _isSmall ? 'calc(100vh - 70px)' : '500px' }">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text class="dx-card-content flex-fill font-roboto weight-400 line-height-30 font-title darken3--text pt-10 px-10 pb-3">
            <div class="font-title line-height-30 mb-10">
              Complete <b>el o los campos necesarios</b> para realizar la búsqueda del documento que desea.
            </div>

            <v-row class="mt-3">
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0">
                <span>Tema o materia:</span>
                <dx-text-field v-model="d_tema" flat solo outlined placeholder="Escriba el tema/materia" />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0">
                <span>Tipo: </span>
                <dx-select v-model="d_tipo" :items="documentOptions" label="Selecciona el tipo" />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="4" class="py-sm-0 px-xs-0">
                <span>Folio:</span>
                <dx-text-field v-model="d_folio" flat solo outlined placeholder="Escriba el folio" />
              </v-col>
            </v-row>

            <v-row class="mt-6" no-gutters>
              <v-col cols="12">
                <div class="weight-700 darken3--text font-regular mb-3">Creación</div>
              </v-col>
              <v-col>
                <div class="d-inline-block">Desde:</div>
                <div class="d-inline-block px-0 datepicker col-12 col-md-4 px-md-3">
                  <dx-date-picker ref="picker1" v-model="d_createdStart" no-title color="primary" cleared />
                </div>
              </v-col>
              <v-col>
                <div class="d-inline-block">Hasta:</div>
                <div class="d-inline-block px-0 datepicker col-12 col-md-4 px-md-3">
                  <dx-date-picker v-model="d_createdEnd" no-title color="primary" cleared />
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-0 mt-md-8" no-gutters>
              <v-col cols="12">
                <div class="weight-700 darken3--text font-regular mb-3">Actualización</div>
              </v-col>
              <v-col>
                <div class="d-inline-block">Desde:</div>
                <div class="d-inline-block px-0 datepicker col-12 col-md-4 px-md-3">
                  <dx-date-picker v-model="d_updatedStart" no-title color="primary" cleared />
                </div>
              </v-col>
              <v-col>
                <div class="d-inline-block">Hasta:</div>
                <div class="d-inline-block px-0 datepicker col-12 col-md-4 px-md-3">
                  <dx-date-picker v-model="d_updatedEnd" no-title color="primary" cleared />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-10 pb-10 mt-2 d-flex justify-end justify-xs-center">
            <dx-button color="primary" outlined class="text-none" @click="cancel">
              <span class="text-underline"> Cancelar </span>
            </dx-button>
            <dx-button color="primary" class="text-none ml-5" @click="filter">
              <span class="text-underline"> Buscar </span>
            </dx-button>
          </v-card-actions>
        </v-form>
      </perfect-scrollbar>
    </v-card>
  </v-dialog>
</template>

<script>
import { responsiveMixin } from '~/shared/mixins/responsiveMixin'
import { closeableMixin } from '~/shared/mixins/closeableMixin'

export default {
  name: 'ModalDocumentFilters',
  mixins: [responsiveMixin, closeableMixin],
  props: {
    tema: String,
    tipo: String,
    folio: String,
    createdStart: String,
    createdEnd: String,
    updatedStart: String,
    updatedEnd: String,
    documentOptions: { type: Array, default: [] },
    iscancel: Boolean,

    //watch
    ctema: Boolean,
    ctipo: Boolean,
    cfolio: Boolean,
    ccreatedStart: Boolean,
    ccreatedEnd: Boolean,
    cupdatedStart: Boolean,
    cupdatedEnd: Boolean,
  },
  data() {
    return {
      valid: true,
      d_tema: this.tema,
      d_tipo: this.tipo,
      d_folio: this.folio,
      d_createdStart: this.createdStart,
      d_createdEnd: this.createdEnd,
      d_updatedStart: this.updatedStart,
      d_updatedEnd: this.updatedEnd,
    }
  },
  methods: {
    clean(item) {
      this[item] = ''
    },
    cancel() {
      this.$emit('onCancel')
      this.$refs.form.reset()
    },
    filter() {
      const { d_tema, d_tipo, d_folio, d_createdStart, d_createdEnd, d_updatedStart, d_updatedEnd } = this
      this.$emit('onFilter', {
        tema: d_tema,
        tipo: d_tipo,
        folio: d_folio,
        createdStart: d_createdStart,
        createdEnd: d_createdEnd,
        updatedStart: d_updatedStart,
        updatedEnd: d_updatedEnd,
      })
    },
  },
  watch: {
    ctema: {
      handler: function (after, before) {
        this.clean('d_tema')
      },
      deep: true,
    },
    ctipo: {
      handler: function (after, before) {
        this.clean('d_tipo')
      },
      deep: true,
    },
    cfolio: {
      handler: function (after, before) {
        this.clean('d_folio')
      },
      deep: true,
    },
    ccreatedStart: {
      handler: function (after, before) {
        this.clean('d_createdStart')
        this.$refs.form.inputs[3].reset()
      },
      deep: true,
    },
    ccreatedEnd: {
      handler: function (after, before) {
        this.clean('d_createdEnd')
        this.$refs.form.inputs[4].reset()
      },
      deep: true,
    },
    cupdatedStart: {
      handler: function (after, before) {
        this.clean('d_updatedStart')
        this.$refs.form.inputs[5].reset()
      },
      deep: true,
    },
    cupdatedEnd: {
      handler: function (after, before) {
        this.clean('d_updatedEnd')
        this.$refs.form.inputs[6].reset()
      },
      deep: true,
    },
    iscancel: {
      handler: function (after, before) {
        this.$refs.form.reset()
      },
      deep: true,
    },
  },
}
</script>
