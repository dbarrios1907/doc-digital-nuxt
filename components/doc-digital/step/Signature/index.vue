<template>
  <validation-observer ref="observer">
    <form @submit.prevent="">
      <dx-step-body>
        <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
        <v-row no-gutters>
          <v-col cols="12">
            <label>Firmantes y orden de firma * </label>
            <sign-list username-prop="name" entity-prop="entityName" item-value="id" list-type="firmantes" />
          </v-col>
        </v-row>

        <h3 class="mt-9 mb-1">Formato</h3>
        <p class="mb-6">De acuerdo al formato de su documento, complete los siguientes campos:</p>

        <v-row no-gutters :style="colMaxWidthStyle">
          <v-col style="max-width: 500px" cols="12" sm="5" md="5" lg="5" class="pr-0 pr-sm-8">
            <label>Número de hoja *</label>
            <validation-provider v-slot="{ errors }" name="visaType" rules="required">
              <dx-select v-model="pageSelected" :items="pages" placeholder="# de página" required :error-messages="errors" />
            </validation-provider>
            <dx-small-description> N° de página en la que se estampará la firma. </dx-small-description>
          </v-col>
          <v-col cols="12" sm="7" md="7" lg="7">
            <label>Margen inferior reservado *</label>
            <span class="field-hint pl-2">
              <dx-icon
                v-tooltip="{
                  content: helpHint,
                }"
                dense
                color="warning"
              >
                mdi-help-circle
              </dx-icon>
            </span>
            <div class="d-flex">
              <inline-label class="pt-3" min-width="140px">Centímetros</inline-label>
              <dx-text-field
                style="max-width: 100px"
                type="number"
                class="d-flex-inline"
                solo
                flat
                outlined
                :rules="[() => 'Campo Requerido']"
                label="cm"
                required
              />
            </div>
            <dx-small-description>
              Para asegurar que la firma quedará en la ubicación correcta sin interrumpir el contenido del documento.
            </dx-small-description>
          </v-col>
        </v-row>
      </dx-step-body>
    </form>
  </validation-observer>
</template>
<script>
import DxTextField from '~/components/style-guide/form/text-field'
import { wizardStepMixin } from '~/shared/mixins/wizardStepMixin'
import SignList from '~/components/doc-digital/signList'
export default {
  name: 'Signature',
  components: { DxTextField, SignList },
  mixins: [wizardStepMixin],
  data() {
    return {
      pageSelected: undefined,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      helpHint: 'This is a help hint',
      colMaxWidthStyle: 'max-width: 600px',
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
}

@include theme(v-text-field) using($material) {
  border-radius: 0 !important;
}

.field-hint {
  @media #{map-get($display-breakpoints, 'xs-only')} {
    float: right;
  }
}
</style>
