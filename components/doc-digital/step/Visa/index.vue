<template>
  <dx-step-body>
    <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
    <v-row no-gutters>
      <v-col cols="12" lg="4" sm="6" md="5" colclass="pr-4">
        <label>Tipo de visación *</label>
        <dx-select
          v-model="visaType"
          :items="visaTypeOpts"
          placeholder="Selecione el tipo de visación"
          :rules="[() => !!tipo || 'Campo requerido']"
          label="Selecciona una opción"
          @change="updatefield('tipo', $event)"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <label>Visadores y orden de visación *</label>
      </v-col>
      <dx-box centered bordered elevation add-class='py-4'>
        <dx-button small outlined color="primary" v-bind="$props">
          <dx-icon left chevron regular> mdi-plus-circle-outline </dx-icon>
          <span class="underline-text">Agregar lista de visación</span>
        </dx-button>
      </dx-box>
    </v-row>
  </dx-step-body>
</template>
<script>
export default {
  data() {
    return {
      visaType: undefined,
      visaTypeOpts: ['Visación obligatoria', 'Visación opcional', 'otro'],
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
