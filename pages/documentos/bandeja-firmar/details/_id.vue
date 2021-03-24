<template>
  <DocumentDetail :timeline="timeline" :tableitem="tableitem" :requesting="requesting" :steps="tramitacion" />
</template>

<script>
export default {
  fetch() {
    this.fetch_('timeline', 'documents/getSteps')
    this.fetch_('tableitem', 'documents/getDocument')
    this.fetch_('tramitacion', 'documents/getTramitacion')
  },
  data: () => ({
    timeline: [],
    tableitem: {},
    tramitacion: [],
    requesting: true,
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
