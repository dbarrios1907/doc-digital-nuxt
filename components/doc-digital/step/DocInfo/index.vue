<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <dx-step-body>
      <form @submit.prevent="submit">
        <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6" lg="6" class="pr-0 pr-md-4">
            <span>Tipo de documento *</span>
            <validation-provider v-slot="{ errors }" name="documentType" rules="required">
              <dx-select
                v-model="tipo"
                item-text="descripcion"
                :items="documentTypeOptions"
                :error-messages="errors"
                label="Selecciona una opción"
                @change="updatefield('tipo', $event)"
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" class="pr-0">
            <span>Materia o Tema del documento *</span>
            <validation-provider v-slot="{ errors }" name="documentSubject" rules="required">
              <dx-text-field v-model="materia" solo flat outlined :error-messages="errors" label="Escriba el tema o materia" required />
            </validation-provider>
          </v-col>
          <v-col cols="12" class="py-0 px-0">
            <span>Descripción del documento *</span>
            <validation-provider v-slot="{ errors }" name="description" rules="required|max:255">
              <v-textarea
                v-model="description"
                no-resize
                rows="4"
                outlined
                required
                :error-messages="errors"
                @input="updatefield('description', $event)"
                @blur="blurfield('hiddedesc', 'description')"
              >
                <template v-slot:append>
                  <div class="count darken3--text">{{ desclength }}/{{ limitmaxCount }}</div>
                </template>
              </v-textarea>
            </validation-provider>
            <span class="font-small line-height-30 weight-400">Resuma brevemente el contenido del documento.</span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="6" class="py-0 pl-0 pr-4">
            <v-checkbox v-model="reservado" label="Documento reservado" class="float-left darken--text" />
            <dx-icon left class="ml-4 py-5" size="18" color="warning">mdi-help-circle</dx-icon>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" class="pr-0">
            <span>Folio *</span>
            <validation-provider v-slot="{ errors }" name="folio" rules="required|max:255">
              <dx-text-field
                v-model="folio"
                :hide-details="hiddefolio"
                flat
                solo
                outlined
                :error-messages="errors"
                required
                @blur="blurfield('hiddefolio', 'folio')"
                @input="updatefield('folio', $event)"
              />
            </validation-provider>

            <div class="text-right darken3--text">{{ foliolength }}/{{ limitmaxCount }}</div>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6" lg="6" class="py-0 pl-0 pr-4">
            <div>Documento a distribuir *</div>
            <div class="font-small line-height-24 weight-400 darken2--text mt-2 mb-5">
              Cargue solo un archivo en formato PDF de máximo 20 MB<br >El sistema reconocerá si éste viene firmado.
              <dx-icon left size="18" color="warning">mdi-help-circle</dx-icon>
            </div>
            <Upload multiple v-bind="$props" class="d-inline-block mr-2" />
            o
            <LazyModalLoadUrl
              :dialog="dialogurl"
              title="Agregar url como archivo principal"
              button-text="Cargar Referencia URL"
              class="ml-2 d-inline-block"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" class="py-0 pr-0">
            <div>Anexos</div>
            <div class="mb-5 font-small line-height-24 weight-400 darken2--text mt-2">
              Puede cargar múltiples archivos con un máximo de 50 MB y en formato libre.
            </div>
            <Upload multiple v-bind="$props" class="d-inline-block mr-2" />
            o
            <LazyModalLoadUrl class="ml-2 d-inline-block" />
          </v-col>
        </v-row>
      </form>
    </dx-step-body>
  </validation-observer>
</template>
<script>
import DxTextField from '~/components/style-guide/form/text-field'
import { wizardStepMixin } from '~/shared/mixins/wizardStepMixin'

const defaultValues = {
  files: [],
  tipo: '',
  materia: '',
  description: '',
  folio: '',
  reservado: false,
}

export default {
  components: { DxTextField },
  mixins: [wizardStepMixin],
  inheritAttrs: false,
  props: {
    documentTypeOptions: {
      type: Array,
      default: () => [],
    },
    documentFileOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultValues,
      ...defaultValues,
      hiddedesc: true,
      hiddefolio: true,
      limitmaxCount: 255,
      dialogurl: false,
    }
  },
  computed: {
    desclength() {
      return this.description ? this.description.length : 0
    },
    foliolength() {
      return this.folio ? this.folio.length : 0
    },
  },
  methods: {
    updatefield(key, data) {
      this[key] = data
    },
    blurfield(key, value) {
      this[key] = this[value]?.length > 0
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
