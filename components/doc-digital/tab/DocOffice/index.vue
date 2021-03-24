<template>
  <div>
    <p class="my-4 pb-4 line-height-24">
      Si debe distribuir este documento hacia otras instituciones agregue el nombre de las Oficinas de Partes aquí.
    </p>
    <v-row no-gutters>
      <v-col cols="12" md="4" class="pr-sm-2">
        <label class="text-truncate">Ministerio u Organismo *</label>
        <cc-select v-model="org" :items="orgOpts" :placeholder="placeholderMinister" :label="placeholderMinister" cc add />
      </v-col>
      <v-col cols="12" md="4" class="pl-sm-2 flex-shrink-0">
        <label class="text-truncate">Oficina de Partes *</label>
        <cc-select v-model="secretaria" :items="orgOpts" :placeholder="placeholderSecretaria" :label="placeholderSecretaria" cc add />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'TabDocOffice',
  data: () => ({
    placeholderMinister: 'Ingrese el organismo del destinatario',
    placeholderSecretaria: 'Ingrese el organismo del destinatario',
    secretaria: undefined,
    org: undefined,
    orgOpts: [
      {
        name: 'Dirección de Presupuestos',
        id: '1',
      },
      {
        name: 'Tesorería General de la República',
        id: '2',
      },
      {
        name: 'Servicio de Impuestos Internos',
        id: '3',
      },
      {
        name: 'Dirección de compras públicas',
        id: '4',
      },
      {
        name: 'Dirección Nacional de Servicio Civil de la región metropolitana',
        id: '5',
      },
      {
        name: 'Servicio Nacional de Aduanas',
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
