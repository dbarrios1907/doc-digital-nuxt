<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="">
      <p class="my-4 pb-4 line-height-24">
        Si debe distribuir este documento hacia otras instituciones agregue el nombre de las Oficinas de Partes aquí.
      </p>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pr-sm-2">
          <label class="text-truncate"><span class="weight-700">Filtrar por</span> Ministerio u Organismo *</label>
          <v-autocomplete
            v-model="org"
            :ripple="false"
            solo
            flat
            outlined
            :items="orgOpts"
            :loading="loadingOrg"
            hide-details
            hide-selected
            item-text="name"
            item-value="id"
            :label="placeholderMinister"
            placeholder="Debe escribir al menos 4 caracteres"
            no-data-text="No existen coincidencias"
          >
            <template v-slot:item="{ item, on, attrs }">
              <v-list-item :ripple="false" v-bind="attrs" v-on="on">
                <template>
                  <v-list-item-content>
                    <v-list-item-title :id="attrs['aria-labelledby']" :title="item.name || item" v-text="item.name" />
                  </v-list-item-content>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-5">
        <v-col cols="12" md="6" class="flex-shrink-0">
          <label class="text-truncate"><span class="weight-700">Seleccione</span> Oficina de Partes *</label>
          <validation-provider v-slot="{ errors }" name="secretaria" rules="required">
            <dx-select
              v-model="secretaria"
              :items="orgOpts"
              :placeholder="placeholderSecretaria"
              :label="placeholderSecretaria"
              item-value="name"
              :error-messages="errors"
            />
          </validation-provider>
          <div class="d-flex" style="position: relative; top: -20px">
            <v-checkbox v-model="cc" :ripple="false" label="Enviar en copia" class="ml-1" />
            <cc-badge class="d-inline-flex mt-4" />
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pl-sm-2 flex-shrink-0">
          <dx-button color="primary" text v-bind="$props" class="mt-6 mt-sm-0 mt-md-8 ml-md-2" @click="onAdd">
            <dx-icon left regular> mdi-plus-circle-outline </dx-icon>
            <span class="underline-text">Agregar Oficina de partes</span>
          </dx-button>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
const defaultValues = {
  cc: false,
  secretaria: undefined,
}
export default {
  name: 'TabDocOffice',
  data: () => ({
    ...defaultValues,
    placeholderMinister: 'Ingrese el organismo del destinatario',
    placeholderSecretaria: 'Ingrese el organismo del destinatario',
    org: undefined,
    loadingOrg: false,
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
      Object.assign(this, defaultValues)
      this.$refs.observer.reset()
    },
    async onAdd() {
      console.log(this.secretaria, this.cc)
      const valid = await this.$refs.observer.validate()
      console.log(valid)
      if (!valid) return
      this.$emit('onAdd', {
        cc: this.cc,
        email: this.secretaria,
      })
      this.reset()
    },
  },
}
</script>
