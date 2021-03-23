<template>
  <v-row>
    <perfect-scrollbar :style="{ height: '100%', width: '100%' }">
      <v-col cols="12" class="mt-3 mb-7 d-md-flex d-lg-flex d-xl-flex">
        <dx-bodytitle>
          <template v-slot:title>
            <div class="weight-700 font-title line-height-29">Nuevo documento a distribuir</div>
          </template>
          <template v-slot:subtitle>
            <p class="weight-400 mt-3 font-regular line-height-24">
              Complete los campos solicitados para ingresar un nuevo documento a distribuir. <br >
              (*) campos obligatorios.
            </p>
          </template>
        </dx-bodytitle>
      </v-col>
      <v-col cols="12" class="mb-15">
        <dx-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"> 1. Documento</v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="e1 > 2" step="2"> 2. Destinatarios</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="px-8 py-8">
                <v-row>
                  <v-col cols="6" class="px-0 py-0">
                    <p class="weight-400 mt-3 font-regular line-height-24">Complete la información general del documento.</p>
                  </v-col>
                  <v-col cols="6" class="text-right px-0 py-0 my-auto">
                    <dx-button color="primary" text class="px-0 py-0">
                      <dx-icon left>mdi-help-circle</dx-icon>
                      <span class="pl-1 text-underline">Ayuda</span>
                    </dx-button>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="py-0 pl-0">
                    <span>Tipo de documento *</span>
                    <dx-select
                      v-model="tipo"
                      :items="doctype"
                      :rules="[() => !!tipo || 'Campo requerido']"
                      label="Selecciona una opción"
                      @change="updatefield('tipo', $event)"
                    />
                  </v-col>
                  <v-col cols="6" class="py-0 pr-0">
                    <span>Materia o Tema del documento *</span>
                    <dx-select
                      v-model="tema"
                      :items="doctype"
                      :rules="[() => !!tema || 'Campo requerido']"
                      label="Selecciona una opción"
                      append-icon=""
                      @change="updatefield('tema', $event)"
                    />
                  </v-col>
                  <v-col cols="12" class="py-0 px-0">
                    <span>Descripción del documento *</span>
                    <v-textarea
                      dx-textarea
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
                <v-row>
                  <v-col cols="6" class="py-0 pl-0">
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

                <v-row>
                  <v-col cols="6" class="py-0 pl-0">
                    <div>Documento a distribuir *</div>
                    <div class="font-small line-height-24 weight-400 darken2--text mt-2 mb-5">
                      Cargue solo un archivo en formato PDF de máximo 20 MB<br >El sistema reconocerá si éste viene firmado.
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
              </v-card>

              <div class="next text-right">
                <dx-button color="white" small text @click="e1 = 2">
                  <span class="underline-text">Siguiente</span>
                  <dx-icon right chevron> mdi-arrow-right</dx-icon>
                </dx-button>
              </div>
              <div class="text-right mt-8 mb-9">
                <dx-button color="primary" small text @click="e1 = 2">
                  <dx-icon right chevron> mdi-close</dx-icon>
                  <span class="underline-text ml-1">Descartar documento</span>
                </dx-button>
                <dx-button color="primary" small text @click="e1 = 2">
                  <dx-icon right chevron> mdi-content-save</dx-icon>
                  <span class="underline-text ml-1">Guardar borrador</span>
                </dx-button>
              </div>
            </v-stepper-content>
            <v-stepper-content step="2" class="display:none">
              <v-card class="px-8 py-8">
                <v-row>
                  <v-col cols="6" class="px-0 py-0">
                    <p class="weight-400 mt-3 font-regular line-height-24">Complete la información general del documento.</p>
                    <dx-button color="primary" outlined small>
                      <dx-icon right chevron class="mx-0 mr-2"> mdi-plus-circle</dx-icon>
                      <span class="underline-text">Oficina de Partes</span>
                    </dx-button>
                    <dx-button color="primary" outlined small>
                      <dx-icon right chevron class="mx-0 mr-2"> mdi-plus-circle</dx-icon>
                      <span class="underline-text">Lista guardada</span>
                    </dx-button>
                  </v-col>
                  <v-col cols="6" class="text-right px-0 py-0 my-auto">
                    <dx-button color="primary" text class="px-0 py-0">
                      <dx-icon left>mdi-help-circle</dx-icon>
                      <span class="pl-1 text-underline">Ayuda</span>
                    </dx-button>
                  </v-col>
                </v-row>
              </v-card>
              <div class="next">
                <v-row>
                  <v-col cols="6" class="text-left">
                    <dx-button color="white" text small @click="e1 = 1">
                      <dx-icon right chevron class="mr-1 ml-0"> mdi-arrow-left</dx-icon>
                      <span class="underline-text">Anterior</span>
                    </dx-button>
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <dx-button color="white" text small class="float-rigth success" @click="e1 = 3">
                      <span class="underline-text">Finalizar y enviar</span>
                      <dx-icon right chevron> mdi-send</dx-icon>
                    </dx-button>
                  </v-col>
                </v-row>
              </div>
              <div class="text-right mt-8 mb-9">
                <dx-button color="primary" small text @click="e1 = 2">
                  <dx-icon right chevron> mdi-close</dx-icon>
                  <span class="underline-text ml-1">Descartar documento</span>
                </dx-button>
                <dx-button color="primary" small text @click="e1 = 2">
                  <dx-icon right chevron> mdi-content-save</dx-icon>
                  <span class="underline-text ml-1">Guardar borrador</span>
                </dx-button>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </dx-stepper>
      </v-col>
    </perfect-scrollbar>
  </v-row>
</template>
<script>
export default {
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
      doctype: ['Oficio', 'otro'],
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
<style lang="scss" scoped>
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

@include theme(v-input) using($material) {
  .v-label {
    color: map-deep-get($material, 'colors', 'darken3') !important;
  }
}

@include theme(v-btn) using($material) {
  &.success {
    background-color: map-deep-get($material, 'colors', 'success');
    height: 44px !important;
    margin-top: -2px !important;
  }

  &:not(:first-child) {
    margin-left: -5px !important;
  }
}
</style>
