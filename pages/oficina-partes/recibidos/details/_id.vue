<template>
  <div class="mt-7">
    <v-row>
      <v-col cols="6" class="my-auto pl-0"><span class="font-title line-height-29 weight-700">Estado: Pendiente de firma</span></v-col>
      <v-col cols="6 text-right pr-0">
        <dx-button color="primary" outlined>
          <dx-icon right regular> mdi-download </dx-icon>
          <span class="ml-2 text-underline">Descargar documento</span>
        </dx-button>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12" class="px-13 py-9 bg-grey1">
        <v-row>
          <v-col cols="6" class="my-auto">
            <div class="weight-700 font-25 line-height-31 font-robotoslab">Información general del documento</div>
          </v-col>
          <v-col cols="6" class="text-right">
            <dx-button class="white--text mr-5" color="darken1" @click="dialog1 = true">
              <dx-icon right regular> mdi-close </dx-icon>
              <span class="ml-2 text-underline">Rechazar</span>
            </dx-button>
            <dx-button class="white--text" color="primary2">
              <pencil-write-icon />
              <span class="ml-2 text-underline">Firmar documento</span>
            </dx-button>
          </v-col>
        </v-row>

        <div class="weight-700 font-regular line-height-20 mb-3 mt-6">Previsualizacion:</div>
        <v-row>
          <v-col cols="4">
            <Imagen1 @click="dialog = true" />
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
                    <Imagen2 />
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
          <v-col cols="8">
            <TableItem :items="tableitem" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="weight-700 font-25 line-height-31 font-robotoslab mt-13">Información general del documento</div>
    <div class="weight-700 font-title line-height-29 mt-8">Barra de avance de la tramitación</div>
    <dx-docprogress :items="items" class="mt-7" />
    <dx-collapse :items="itemscollapse" />
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
import Imagen1 from './imagen1'
import Imagen2 from './imagen2'
import TableItem from './tableitem'
export default {
  components: {
    Imagen1,
    Imagen2,
    TableItem,
  },
  data: () => ({
    dialog: false,
    dialog1: false,
    rechazo: '',
    limitmaxCount: 255,
    tableitem: [
      {
        title: 'Tema',
        description: 'Instructivo de Modernización',
      },
      {
        title: 'Descripción',
        description: 'Indica normas y restricciones en el uso de la plataforma DocDigital para el envío de comunicaciones oficiales.',
      },
      {
        name: 'switch',
        title: 'Hacer seguimiento',
        status: true,
      },
      {
        title: 'Reservado',
        description: 'No',
      },
      {
        title: 'Tipo de documento',
        description: 'Oficio',
      },
      {
        title: 'Anexos',
        description: 'No tiene',
      },
      {
        title: 'Página de firma',
        description: 'Primera',
      },
    ],
    items: [
      {
        title: '1. Inicio de la tramitación',
        done: true,
        disable: false,
      },
      {
        title: '2. Visación (no requiere)',
        done: true,
        disable: true,
      },
      {
        title: '3. Firma',
        done: false,
        disable: false,
      },
      {
        title: '4. Folio y despacho',
        done: false,
        disable: false,
      },
      {
        title: '5. Destinatarios',
        done: false,
        disable: false,
      },
    ],
    itemscollapse: [
      {
        name: 'block',
        title: '1. Inicio de la tramitación',
        description: {
          fecha: '10-09-2020 9:58',
          creador: 'Trinidad Swinburn Correa',
          entidad: 'Subsecretaría General de la Presidencia',
        },
      },
      {
        title: '2. Visación',
        disabled: true,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        name: 'card',
        title: '3. Firma',
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
        title: '4. Folio y despacho',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        title: '5. Destinatarios',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
    ],
  }),

  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    desclength() {
      return this.rechazo.length
    },
  },
  created() {
    console.log(this.$route.params.id)
  },
  methods: {
    updatefield(key, data) {
      this[key] = data
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
