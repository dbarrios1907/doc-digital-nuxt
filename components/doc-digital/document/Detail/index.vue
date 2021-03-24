<template>
  <div class="mt-7">
    <v-row>
      <v-col class="my-auto pl-0 col-12 col-md-6"><span class="font-title line-height-29 weight-700">Estado: Pendiente de firma</span></v-col>
      <v-col :class="['px-0 px-md-3 col-12 col-md-6 pr-0', { 'text-right': !ismobil }]">
        <dx-button color="primary" outlined>
          <dx-icon right regular> mdi-download </dx-icon>
          <span class="ml-2 text-underline">Descargar documento</span>
        </dx-button>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col class="px-md-13 py-md-9 bg-grey1 col col-12">
        <v-row>
          <v-col class="my-auto col col-12 col-md-6">
            <div class="weight-700 font-25 line-height-31 font-robotoslab">Información general del documento</div>
          </v-col>
          <v-col :class="['my-auto col col-12 col-md-6', ismobil ? 'text-center' : 'text-right']">
            <dx-button class="white--text mr-md-5" color="darken1" @click="dialog1 = true">
              <dx-icon right regular> mdi-close </dx-icon>
              <span class="ml-2 text-underline">Rechazar</span>
            </dx-button>
            <dx-button class="white--text" color="primary2">
              <pencil-write-icon />
              <span class="ml-2 text-underline">Firmar</span>
            </dx-button>
          </v-col>
        </v-row>

        <div class="weight-700 font-regular line-height-20 mb-3 mt-6">Previsualizacion:</div>
        <v-row>
          <v-col class="col-12 col-md-4">
            <PreviewThumbnail @click="dialog = true" />
            <v-dialog v-model="dialog" overlay-opacity="0.55" overlay-color="#001C41" max-width="960px" :content-class="ismobil">
              <v-card>
                <v-card-title>
                  <h5 class="font-title weight-700 darken3--text">Previsualización de documentos</h5>
                  <v-spacer />
                  <v-btn color="darken3" icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider class="darken1" />

                <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text">
                  <perfect-scrollbar :style="{ height: '500px' }">
                    <PreviewZoom />
                  </perfect-scrollbar>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <dx-button color="primary" class="text-none">
                    <span class="text-underline"> Cerrar </span>
                  </dx-button>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col :class="['col col-12 col-md-8', { 'text-center': requesting }]">
            <DocumentTableItem :items="tableitems" v-if="!requesting" />
            <v-progress-circular indeterminate color="primary" class="mt-10" v-else></v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="weight-700 font-25 line-height-31 font-robotoslab mt-13">Información general del documento</div>
    <div class="weight-700 font-title line-height-29 mt-8">Barra de avance de la tramitación</div>
    <dx-docprogress :items="timeline" class="mt-7" />
    <dx-collapse :items="collapseitems" />
    <v-dialog v-model="dialog1" overlay-opacity="0.55" overlay-color="#001C41" max-width="600px" :content-class="ismobil">
      <v-card>
        <v-card-title>
          <h5 class="font-title weight-700 darken3--text">Rechazar documento</h5>
          <v-spacer />
          <v-btn color="darken3" icon @click="dialog1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="darken1" />

        <v-card-text class="font-roboto weight-400 line-height-30 font-title darken3--text py-10 px-10">
          <div class="font-title line-height-30 mb-10">Para rechazar el documento escriba el motivo</div>
          <div>
            <span>Motivo del rechazo *</span>
            <v-textarea
              v-model="rechazo"
              no-resize
              rows="4"
              outlined
              :value="rechazo"
              :maxlength="limitmaxCount"
              @input="updatefield('rechazo', $event)"
            >
              <template v-slot:append>
                <div class="count darken3--text">{{ desclength }}/{{ limitmaxCount }}</div>
              </template>
            </v-textarea>
          </div>
        </v-card-text>

        <v-card-actions class="px-10">
          <v-spacer />
          <dx-button color="primary" outlined class="text-none" @click="dialog1 = false">
            <span class="text-underline"> Cancelar </span>
          </dx-button>
          <dx-button color="primary" class="text-none ml-5">
            <span class="text-underline"> Firmar </span>
          </dx-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import PreviewZoom from '../../preview/Zoom'
import PreviewThumbnail from '../../preview/Thumbnail'
import DocumentTableItem from '../TableItem'
export default {
  name: 'DocumentDetail',
  components: {
    PreviewThumbnail,
    PreviewZoom,
    DocumentTableItem,
  },
  props: {
    timeline: Array,
    tableitem: Object,
    steps: Array,
    requesting: { type: Boolean, default: true },
  },
  data: () => ({
    dialog: false,
    dialog1: false,
    rechazo: '',
    limitmaxCount: 255,
  }),
  computed: {
    collapseitems() {
      return [
        {
          name: 'block',
          title: '1. Inicio de la tramitación',
          //description: this._filter('CREACION'),
          description: [
            {
              fecha: '10-09-2020 9:58',
              creador: 'Trinidad Swinburn Correa',
              entidad: 'Subsecretaría General de la Presidencia',
            },
          ],
        },
        {
          name: 'block',
          title: '2. Visación',
          disabled: true,
          description: this._filter('VISACION'),
        },
        {
          name: 'card',
          title: '3. Firma',
          //description: this._filter('FIRMA'),
          description: [
            {
              title: 'Grupo 1 de firmas',
              body: [
                {
                  title: 'Sebastian Piñera Echenique',
                  description: 'Administrativa de Presidencia',
                  status: {
                    name: 'mdi-clock-time-three-outline',
                    description: 'Firma pendiente',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'block',
          title: '4. Folio y despacho',
          description: this._filter('FOLIO_DESPACHO'),
        },
        {
          name: 'block',
          title: '5. Destinatarios',
          description: this._filter('DESTINATARIOS'),
        },
      ]
    },
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    desclength() {
      return this.rechazo.length
    },
    tableitems() {
      return [
        {
          title: 'Tema',
          description: this.tableitem.materia,
        },
        {
          title: 'Descripción',
          description: this.tableitem.descripcion,
        },
        {
          name: 'switch',
          title: 'Hacer seguimiento',
          status: this.tableitem.isFirmado,
        },
        {
          title: 'Reservado',
          description: this.tableitem.isReservado ? 'Si' : 'No',
        },
        {
          title: 'Tipo de documento',
          description: this.tableitem.tipoDocumentoOficial ? this.tableitem.tipoDocumentoOficial.descripcion : '',
        },
        {
          title: 'Anexos',
          description: (this.tableitem.anexos ? this.tableitem.anexos.length : 0) > 0 ? 'Si tiene' : 'No tiene',
        },
        {
          title: 'Página de firma',
          description: 'Primera',
        },
      ]
    },
  },
  methods: {
    updatefield(key, data) {
      this[key] = data
    },
    _filter(item) {
      return this.steps.filter(({ tipoEtapa }) => tipoEtapa == item)
    },
  },
}
</script>
<style lang="scss">
.bg-grey1 {
  background-color: #f5f5f5;
}

@include theme(v-input) using($material) {
  margin: 0;
  &.v-input--switch {
    .v-input__control {
      height: 24px;
      .v-input__slot {
        min-height: auto !important;
      }
    }
  }

  &.v-textarea {
    border-radius: 0;
    .count {
      position: absolute;
      bottom: rem-calc(8px);
      right: rem-calc(8px);
    }
  }
}

@include theme(v-dialog) using($material) {
  border-radius: 0;
  .v-card {
    border-radius: 0;
  }
}
</style>
