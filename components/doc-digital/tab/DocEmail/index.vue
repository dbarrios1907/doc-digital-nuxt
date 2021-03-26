<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="4" class="pr-sm-2">
          <label>Ingrese un correo electrónico externo *</label>
          <validation-provider v-slot="{ errors }" name="email" rules="email">
            <dx-text-field v-model="email" type="email" solo flat outlined label="Escribe el correo acá" class="mb-0" :error-messages="errors" />
          </validation-provider>
          <div class="d-flex" style="position: relative; top: -5px">
            <v-checkbox v-model="cc" :ripple="false" label="Enviar en copia" class="ml-1" />
            <cc-badge class="d-inline-flex mt-4" />
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pl-sm-2">
          <label>Oficina de Partes *</label>
          <dx-select v-model="office" :items="officeOpts" placeholder="Selecione el tipo de visación" label="Selecciona una opción" />
        </v-col>
        <v-col cols="12" sm="12" md="4" class="pl-sm-2 d-flex justify-center justify-md-start">
          <dx-button color="primary" text v-bind="$props" class="mt-6 mt-sm-0 mt-md-8 ml-md-2" @click="onAddEmail">
            <dx-icon left regular> mdi-plus-circle-outline</dx-icon>
            <span class="underline-text">Agregar correo</span>
          </dx-button>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import DxButton from '~/components/style-guide/button/Button'

export default {
  name: 'TabDocEmail',
  components: { DxButton },
  data: () => ({
    email: undefined,
    office: undefined,
    cc: false,
    officeOpts: [
      'Dirección de Presupuestos',
      'Tesorería General de la República',
      'Servicio de Impuestos Internos',
      'Dirección de compras públicas',
      'Dirección Nacional de Servicio Civil',
      'Servicio Nacional de Aduanas',
    ],
  }),
  methods: {
    reset() {
      this.email = undefined
      this.cc = false
      this.office = undefined
    },
    onAddEmail() {
      this.$emit('onAdd', {
        email: this.email,
        cc: this.cc,
        office: this.office,
      })
      this.reset()
    },
  },
}
</script>
