<template>
  <div>
    <p class="my-4 pb-4 line-height-24">Agregue una lista de destinatarios frecuentes.</p>
    <v-row no-gutters>
      <v-col cols="12" sm="8" md="6" class="pr-sm-2">
        <label>Listas guardadas</label>
        <cc-select v-model="selectedList" :items="savedLists" :placeholder="placeholder" :label="placeholder" cc add edit remove multiple />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'TabDocSavedList',
  data: () => ({
    placeholder: 'Seleccione 1 o más listas',
    selectedList: undefined,
    savedLists: [
      {
        name: 'Servicios dependientes del Ministerio de Hacienda',
        id: '1',
      },
      {
        name: 'Nombre de la lista #2',
        id: '2',
      },
      {
        name: 'Nombre de la lista #3',
        id: '3',
      },
      {
        name: 'Nombre de la lista #4',
        id: '4',
      },
      {
        name: 'Nombre de la lista #5',
        id: '5',
      },
      {
        name: 'Nombre de la lista #6',
        id: '6',
      },
    ],
  }),
  methods: {
    reset() {
      this.email = undefined
      this.cc = false
      this.office = undefined
    },
    onAddEmail() {
      this.$emit('onAddEmail', {
        name: this.email,
        cc: this.cc,
        office: this.office,
      })
      this.reset()
    },
  },
}
</script>
