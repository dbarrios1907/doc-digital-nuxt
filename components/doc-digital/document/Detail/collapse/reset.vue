<template>
  <dx-collapse :items="itemsCollapse" :border="border" />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    border: Boolean,
  },
  data() {
    return {
      cant: this.items.length + 1,
    }
  },
  computed: {
    itemsCollapse() {
      return this.cant
        ? [
            {
              name: 'notify',
              title: 'Tramitación reiniciada ' + this.cant + (this.cant > 1 ? ' veces' : ' vez'),
              link: 'Revise aquí los motivos',
              description: [
                { creador: 'leo', etapa: 'visacion', motivo: 'testing', createAt: '10-09-2020 9:58' },
                { creador: 'leo', etapa: 'visacion', motivo: 'testing', createAt: '10-09-2020 9:58' },
              ], //this.items,
            },
          ]
        : []
    },
  },
  methods: {
    _filter(item) {
      return this.items.filter(({ tipoEtapa }) => tipoEtapa == item)
    },
  },
}
</script>
