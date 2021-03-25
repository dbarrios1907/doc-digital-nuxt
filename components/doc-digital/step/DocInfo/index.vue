<template>
  <dx-step-body>
    <dx-step-title title="Complete la información general del documento." help-hint="this is a help hint" />
    <v-row no-gutters>
      <v-col cols="6" class="pr-4">
        <span>Tipo de documento *</span>
        <dx-select
          v-model="tipo"
          item-text="descripcion"
          :items="documentTypeOptions"
          :rules="[() => !!tipo || 'Campo requerido']"
          label="Selecciona una opción"
          @change="updatefield('tipo', $event)"
        />
      </v-col>
      <v-col cols="6" class="py-0 pr-0">
        <span>Materia o Tema del documento *</span>
        <dx-select
          v-model="tema"
          item-text="descripcion"
          :items="documentSubjectOptions"
          :rules="[() => !!tema || 'Campo requerido']"
          label="Selecciona una opción"
          @change="updatefield('tema', $event)"
        />
      </v-col>
      <v-col cols="12" class="py-0 px-0">
        <span>Descripción del documento *</span>
        <v-textarea
          v-model="description"
          no-resize
          rows="4"
          outlined
          :value="description"
          :maxlength="limitmaxCount"
          required
          :rules="[() => !!description || 'Campo requerido']"
          :hide-details="hiddedesc"
          @input="updatefield('description', $event)"
          @blur="blurfield('hiddedesc', 'description')"
        >
          <template v-slot:append>
            <div class="count darken3--text">{{ desclength }}/{{ limitmaxCount }}</div>
          </template>
        </v-textarea>
        <span class="font-small line-height-30 weight-400">Resuma brevemente el contenido del documento.</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="py-0 pl-0 pr-4">
        <dx-checkbox v-model="reservado" label="Documento reservado" class="float-left darken--text" />
        <dx-icon left class="ml-4 py-5" size="18" color="warning">mdi-help-circle</dx-icon>
      </v-col>
      <v-col cols="6" class="pr-0">
        <span>Folio *</span>
        <dx-text-field
          v-model="folio"
          :hide-details="hiddefolio"
          flat
          solo
          outlined
          :maxlength="limitmaxCount"
          :rules="[() => !!folio || 'Campo requerido']"
          required
          @blur="blurfield('hiddefolio', 'folio')"
          @input="updatefield('folio', $event)"
        />
        <div class="text-right darken3--text">{{ foliolength }}/{{ limitmaxCount }}</div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="6" class="py-0 pl-0 pr-4">
        <div>Documento a distribuir *</div>
        <div class="font-small line-height-24 weight-400 darken2--text mt-2 mb-5">
          Cargue solo un archivo en formato PDF de máximo 20 MB<br>El sistema reconocerá si éste viene firmado.
          <dx-icon left size="18" color="warning">mdi-help-circle</dx-icon>
        </div>
        <Upload multiple v-bind="$props" />
      </v-col>
      <v-col cols="6" class="py-0 pr-0">
        <div>Anexos</div>
        <div class="mb-5 font-small line-height-24 weight-400 darken2--text mt-2">
          Puede cargar múltiples archivos con un máximo de 50 MB y en formato libre.
        </div>
        <Upload multiple v-bind="$props" class="d-inline-block mr-2" />
        o
        <Upload multiple v-bind="$props" class="ml-2 d-inline-block" />
      </v-col>
    </v-row>
  </dx-step-body>
</template>
<script>
import DxTextField from '~/components/style-guide/form/text-field'
export default {
  components: { DxTextField },
  props: {
    documentTypeOptions: {
      type: Array,
      default: () => [],
    },
    documentSubjectOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      files: [],
      tipo: '',
      tema: '',
      description: '',
      folio: '',
      reservado: false,
      hiddedesc: true,
      hiddefolio: true,
      limitmaxCount: 255,
      e1: 1,
      rules: [value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'],
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
