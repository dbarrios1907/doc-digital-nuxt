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
              body: {
                title: 'Sebastian Piñera Echenique',
                description: 'Administrativa de Presidencia',
                status: {
                  name: 'mdi-clock-time-three-outline',
                  description: 'Firma pendiente',
                },
              },
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
  },
  methods: {
    _filter(item) {
      return this.items.filter(({ tipoEtapa }) => tipoEtapa == item)
    },
  },
}
</script>
