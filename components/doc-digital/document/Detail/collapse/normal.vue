<template>
  <dx-collapse :items="itemsCollapse" />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    itemsCollapse() {
      return [
        {
          name: 'block',
          title: '1. Inicio de la tramitación',
          description: this._filter('CREACION'),
        },
        {
          name: 'block',
          title: '2. Visación',
          description: this._filter('VISACION'),
        },
        {
          name: 'sign',
          title: '3. Firma',
          description: this._filter('FIRMA'),
        },
        {
          name: 'folio',
          title: '4. Folio y despacho',
          description: this._filter('FOLIO_DESPACHO'),
        },
        {
          name: 'destinatarios',
          title: '5. Destinatarios',
          description: this._filter('DESTINATARIOS'),
        },
      ]
    },
  },
  methods: {
    _filter(item) {
      return this.items.filter(({ tipoEtapa }) => tipoEtapa == item)
    },
  },
}
</script>
