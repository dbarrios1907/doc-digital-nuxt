<template>
  <div>
    <p class="my-4 pb-4 line-height-24">Agregue una lista de destinatarios frecuentes.</p>
    <v-row no-gutters>
      <v-col cols="12" sm="8" md="6" class="pr-sm-2">
        <label>Listas guardadas</label>
        <dx-select v-model="selected" :items="savedLists" :placeholder="placeholder" :label="placeholder" />
      </v-col>
      <v-col cols="12" md="6" class="pl-sm-2 flex-shrink-0">
        <dx-button color="primary" text v-bind="$props" class="mt-6 mt-sm-0 mt-md-8 ml-md-2" @click="addToList">
          <dx-icon left regular> mdi-plus-circle-outline </dx-icon>
          <span class="underline-text">Agregar template de destinatarios</span>
        </dx-button>
      </v-col>
    </v-row>

    <h3 class="mt-6 mb-4">Listas seleccionadas:</h3>
    <dx-badge v-for="item in selectedList" type="tertiary" label outlined class="mx-1 my-1">
      <div class="darken3--text font-16 line-height-22 weight-400 textbreak" :title="item.name">{{ item.name }}</div>
      <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeListItem(item)"> mdi-close </dx-icon>
    </dx-badge>
  </div>
</template>

<script>
export default {
  name: 'TabDocSavedList',
  data: () => ({
    placeholder: 'Seleccione 1 o más listas',
    selected: undefined,
    selectedList: [],
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
    addToList(item) {
      this.selectedList.push(this.selected)
      this.selected = undefined
    },
    removeListItem(item) {
      this.selectedList = this.selectedList.filter(v => v.id !== item.id)
    },
  },
}
</script>
