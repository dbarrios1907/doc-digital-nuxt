<template>
  <validation-observer ref="observer">
    <dx-step-body>
      <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
      <form @submit.prevent="">
        <v-row no-gutters>
          <v-col cols="12" lg="6" sm="6" md="6" colclass="pr-4">
            <label>Tipo de visación *</label>
            <validation-provider v-slot="{ errors }" name="visaType" rules="required">
              <dx-select
                v-model="visaType"
                item-text="descripcion"
                item-value="valor"
                :items="visaOptions"
                required
                placeholder="Selecione el tipo de visación"
                :error-messages="errors"
                label="Selecciona una opción"
                @change="updatefield('tipo', $event)"
              />
            </validation-provider>
          </v-col>
        </v-row>
      </form>
      <v-row no-gutters>
        <v-col cols="12">
          <label>Visadores y orden de visación *</label>
          <sign-list username-prop="name" entity-prop="entityName" item-value="id" list-type="visadores" />
        </v-col>
      </v-row>
    </dx-step-body>
  </validation-observer>
</template>
<script>
import { wizardStepMixin } from '~/shared/mixins/wizardStepMixin'
import SignList from '~/components/doc-digital/signList'

export default {
  components: {
    SignList,
  },
  mixins: [wizardStepMixin],
  props: {
    visaOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tipo: '',
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
