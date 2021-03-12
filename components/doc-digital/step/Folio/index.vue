<template>
  <dx-step-body>
    <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="5" lg="4" colclass="pr-4">
        <label>Oficina de Partes que despacha *</label>
        <dx-select
          v-model="office"
          :items="officeOpts"
          placeholder="Selecciona una oficina"
          label="Selecciona una oficina"
          :rules="[() => !!tipo || 'Campo requerido']"
        />
      </v-col>
      <v-col cols="12" sm="6" colclass="pr-4">
        <div class="mt-sm-11 ml-sm-4 d-inline-flex">¿En qué casos debo usarlo?</div>
        <dx-icon
          v-tooltip="{
            content: officeHint,
          }"
          class="ml-sm-4"
          dense
          color="warning"
        >
          mdi-help-circle
        </dx-icon>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-7">
      <v-col cols="11" sm="6" md="5" lg="4" colclass="pr-4">
        <label>Número de folio *</label>
        <dx-text-field solo flat outlined :rules="[() => 'This field is required']" label="Escribe el número de folio acá" required />
      </v-col>
      <v-col cols="1">
        <dx-icon
          v-tooltip="{
            content: folioHint,
          }"
          class="mt-11 ml-2 mr-2"
          dense
          color="warning"
        >
          mdi-help-circle
        </dx-icon>
      </v-col>
      <v-col cols="12">
        <dx-checkbox v-model="knowFolio" :ripple="false" label="No conozco el número de folio" />
      </v-col>
    </v-row>
  </dx-step-body>
</template>
<script>
import DxTextField from '~/components/style-guide/form/text-field'
export default {
  components: { DxTextField },
  data() {
    return {
      office: undefined,
      officeOpts: ['Subsecretaría General de la Presidencia', 'Otra Oficina'],
      officeHint: 'Ayuda acerca de selección de oficina',
      folioHint: 'Ayuda sobre número de folio',
      knowFolio: false,
    }
  },
  computed: {
    desclength() {
      return this.description.length
    },
    foliolength() {
      return this.folio.length
    },
  },
  methods: {
    updatefield(key, data) {
      this[key] = data
    },
    blurfield(key, value) {
      this[key] = this[value].length > 0
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
