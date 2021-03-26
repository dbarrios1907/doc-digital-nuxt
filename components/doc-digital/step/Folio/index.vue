<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="">
      <dx-step-body>
        <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="5" lg="4" colclass="pr-4">
            <label>Oficina de Partes que despacha *</label>
            <validation-provider v-slot="{ errors }" name="oficinaPartesDespacha" rules="required">
              <dx-select
                v-model="office"
                :items="officeOpts"
                placeholder="Selecciona una oficina"
                label="Selecciona una oficina"
                required
                :error-messages="errors"
              />
            </validation-provider>
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
            <validation-provider v-slot="{ errors }" :rules="condRule" name="folio">
              <dx-text-field v-model="folio" solo flat outlined label="Escribe el número de folio acá" :error-messages="errors" />
            </validation-provider>
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
            <div class="d-flex justify-start">
              <v-checkbox v-model="knowFolio" :ripple="false" label="No conozco el número de folio" />
            </div>
          </v-col>
        </v-row>
      </dx-step-body>
    </form>
  </validation-observer>
</template>
<script>
import DxTextField from '~/components/style-guide/form/text-field'
import { wizardStepMixin } from '~/shared/mixins/wizardStepMixin'

const defaultValues = {
  office: undefined,
  folio: undefined,
  knowFolio: false,
}
export default {
  components: { DxTextField },
  mixins: [wizardStepMixin],
  data() {
    return {
      defaultValues,
      ...defaultValues,
      officeOpts: ['Subsecretaría General de la Presidencia', 'Otra Oficina'],
      officeHint: 'Ayuda acerca de selección de oficina',
      folioHint: 'Ayuda sobre número de folio',
    }
  },
  computed: {
    desclength() {
      return this.description.length
    },
    foliolength() {
      return this.folio.length
    },

    condRule() {
      return !this.knowFolio ? 'required' : ''
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
