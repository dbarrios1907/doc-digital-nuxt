<template>
  <div>
    <DocumentDetail
      :timeline="timeline"
      :tableitem="tableitem"
      :requesting="requesting"
      :steps="steps"
      :rejectedocs="rejectedocs"
      :docid="this.$route.params.id"
      :tramites="tramites"
      :src="src"
    >
      <template v-slot:actionsPrimary>
        <dx-button color="darken3" class="white--text" href="/api/public/documentos/3/archivo?tempHash=olPcMhNYfL" download>
          <dx-icon right regular> mdi-download </dx-icon>
          <span class="ml-2 text-underline">Descargar trazabilidad</span>
        </dx-button>

        <dx-button color="primary" outlined :href="src" download>
          <dx-icon right regular> mdi-download </dx-icon>
          <span class="ml-2 text-underline">Descargar documento</span>
        </dx-button>
      </template>
    </DocumentDetail>
  </div>
</template>

<script>
export default {
  fetch() {
    this.fetch_('timeline', 'documents/fetchTramiteProgress')
    this.fetch_('tableitem', 'documents/fetchDocument')
    this.fetch_('steps', 'documents/fetchDocumentTasks')
    this.fetch_('rejectedocs', 'documents/rejectDocumentTramite')
    this.fetch_('tramites', 'documents/fetchDocumentTramite')
  },
  data: () => ({
    timeline: [],
    tableitem: {},
    steps: [],
    requesting: true,
    rejectedocs: [],
    tramites: {},
    dialog1: false,
    dialog2: false,
    src: '/api/public/documentos/1/archivo?tempHash=olPcMhNYfL',
  }),
  methods: {
    async fetch_(item, url) {
      let resp = await this.$store.dispatch(url, this.$route.params.id)
      if (resp) {
        this[item] = resp
        this.requesting = false
      }
    },
  },
}
</script>
