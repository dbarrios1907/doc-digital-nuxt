<template>
  <dx-step-body>
    <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
    <v-row no-gutters>
      <dx-tabs :items="items" tabtype="outlined">
        <template v-slot:tab-item>
          <v-tab-item>
            <TabDocEmail></TabDocEmail>
          </v-tab-item>
          <v-tab-item>
            <TabDocOffice></TabDocOffice>
          </v-tab-item>
          <v-tab-item>
            <TabDocSavedList></TabDocSavedList>
          </v-tab-item>
        </template>
      </dx-tabs>
    </v-row>

    <EmailDestinationList :list="destinations" @onRemove="removeDestination" />
  </dx-step-body>
</template>
<script>
import EmailDestinationList from '~/components/doc-digital/email/DestinationList'
export default {
  components: {
    EmailDestinationList,
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Correo electrónico', icon: 'mdi-plus-circle-outline' },
        { tab: 'Oficina de Partes', icon: 'mdi-plus-circle-outline' },
        { tab: 'Lista guardada', icon: 'mdi-plus-circle-outline' },
      ],
      destinations: [
        {
          id: '1',
          name: 'Dirección de Presupuestos',
        },
        {
          id: '2',
          name: 'email@entidad.gob.cl',
          cc: true,
        },
        {
          id: '3',
          name: 'Tesorería General de la República',
        },
        {
          id: '4',
          name: 'Dirección Nacional de Servicio Civil',
        },
        {
          id: '5',
          name: 'Servicio Nacional de Aduanas',
          cc: true,
        },
      ],
    }
  },
  computed: {},
  methods: {
    removeDestination(item, index) {
      this.destinations = this.destinations.filter(v => v.id !== item.id)
    },
  },
}
</script>

<style lang="scss">
@include theme(v-textarea) using($material) {
  border-radius: 0 !important;

  .count {
    position: absolute;
    bottom: rem-calc(8px);
    right: rem-calc(8px);
  }
}

@include theme(v-text-field) using($material) {
  border-radius: 0 !important;
}
</style>
