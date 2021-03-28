<template>
  <DocumentDetail :timeline="timeline" :tableitem="tableitem" :requesting="requesting" :steps="tramitacion" :rejectedocs="rejectedocs" />
</template>

<script>
export default {
  fetch() {
    this.fetch_('timeline', 'documents/getSteps')
    this.fetch_('tableitem', 'documents/fetchDocument')
    this.fetch_('tramitacion', 'documents/getTramitacion')
    this.fetch_('rejectedocs', 'documents/rejectDocumentTramite')
  },
  data: () => ({
    timeline: [],
    tableitem: {},
    tramitacion: [],
    requesting: true,
    rejectedocs: [],
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
