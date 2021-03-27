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
  computed: {
    itemsCollapse() {
      return this.items.length > 0
        ? [
            {
              name: 'notify',
              title: 'Tramitación reiniciada ' + this.items.length + (this.items.length > 1 ? ' veces' : ' vez'),
              link: 'Revise aquí los motivos',
              description: this.items,
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
