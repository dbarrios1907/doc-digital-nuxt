<template>
  <div class="mt-7">
    <v-row>
      <v-col class="my-auto pl-0 col-12 col-md-6"><span class="font-title line-height-29 weight-700">Estado: Pendiente de firma</span></v-col>
      <v-col :class="['px-0 px-md-3 col-12 col-md-6 pr-0', { 'text-right': !ismobil }]">
        <slot name="actionsPrimary" />
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col class="px-md-13 py-md-9 py-lg-9 bg-grey1 col col-12">
        <v-row>
          <v-col class="my-auto col col-12 col-md-6">
            <div class="weight-700 font-25 line-height-31 font-robotoslab">Información general del documento</div>
          </v-col>
          <v-col :class="['my-auto col col-12 col-md-6', ismobil ? 'text-center' : 'text-right']">
            <slot name="actions" />
          </v-col>
        </v-row>

        <div class="weight-700 font-regular line-height-20 mb-3 mt-6">Previsualizacion:</div>
        <v-row>
          <v-col class="col-12 col-md-4">
            <PreviewThumbnail>
              <template v-slot:zoom>
                <zoom-icon @click="dialog = true" />
              </template>
            </PreviewThumbnail>

            <PreviewZoom v-model="dialog" @onClose="dialog = false" />
          </v-col>
          <v-col :class="['col col-12 col-md-8', { 'text-center': requesting }]">
            <DocumentTableItem :items="tableitems" v-if="!requesting" />
            <v-progress-circular indeterminate color="primary" class="mt-10" v-else></v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="weight-700 font-25 line-height-31 font-robotoslab mt-13">Información de la tramitación del documento</div>
    <div class="weight-700 font-title line-height-29 mt-8">Resumen de avance de la tramitación</div>
    <dx-docprogress :items="timeline" class="mt-7" />
    <DocumentDetailCollapseReset :items="rejectedocs" border class="my-4" />
    <DocumentDetailCollapseNormal :items="steps" />
  </div>
</template>
<script>
//import PreviewZoom from '../../preview/Zoom'
import PreviewThumbnail from '../../preview/Thumbnail'
import DocumentTableItem from '../TableItem'

export default {
  components: {
    PreviewThumbnail,
    //PreviewZoom,
    DocumentTableItem,
  },
  props: {
    docid: String,
    timeline: Array,
    tableitem: Object,
    steps: Array,
    requesting: { type: Boolean, default: true },
    rejectedocs: Array,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
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
    download() {
      this.$store.dispatch('documents/downloadDocument', this.docid)
    },
  },
}
</script>
<style scoped lang="scss">
.bg-grey1 {
  background-color: #f5f5f5;
}

@include theme(v-dialog) using($material) {
  border-radius: 0;
  .v-card {
    border-radius: 0;
  }
}
</style>
