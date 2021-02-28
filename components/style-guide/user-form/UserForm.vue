<template>
  <v-row class="px-9 user-form">
    <perfect-scrollbar :style="{ height: '100%' }">
      <v-col cols="12" class="d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil">
        <dx-breadcrumbs :items="breadcrumbs" />
      </v-col>
      <v-col cols="12" v-if="!ismobil" class="mt-6 d-none d-md-flex d-lg-flex d-xl-flex">
        <dx-bodytitle>
          <template v-slot:title>
            <div class="weight-700 text-md-h4 line-height-31">Nuevo Usuario</div>
          </template>
        </dx-bodytitle>
      </v-col>
      <v-col cols="12" class="mt-6 mb-13" v-if="ismobil">
        <div class="weight-700 text-md-h4 line-height-31">Nuevo Usuario</div>
      </v-col>
      <v-col cols="12 d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil">
        <div class="weight-400 line-height-30 font-16">Complete el formulario para crear un nuevo usuario.</div>
      </v-col>

      <div class="mt-3" ref="form">
        <v-col cols="12" style="max-height: 74px">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">RUT*</labelCol>
            <v-col>
              <v-text-field
                ref="rut"
                v-model="rut"
                solo
                flat
                outlined
                :rules="[() => !!rut || !!rut_dv || 'Campo requerido']"
                :error-messages="errorMessages"
                label="99.999.999"
                style="width: 108px"
                required
                class="d-inline-block"
              />
              -
              <v-text-field
                ref="rut_dv"
                v-model="rut_dv"
                solo
                flat
                outlined
                :error-messages="errorMessages"
                label="K"
                style="width: 37px"
                required
                class="d-inline-block"
              />
            </v-col>
          </v-row>
        </v-col>

        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Nombre(s)*</labelCol>
            <v-col>
              <v-text-field
                ref="name"
                v-model="name"
                solo
                flat
                outlined
                :rules="[() => !!name || 'Campo requerido']"
                label="Nombre Nombre"
                required
              />
            </v-col>
          </v-row>
        </customCol>

        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Apellido(s)*</labelCol>
            <v-col>
              <v-text-field
                ref="lastname"
                v-model="lastname"
                solo
                flat
                outlined
                label="Apellido Apellido"
                :rules="[() => !!lastname || 'Campo requerido']"
                required
              />
            </v-col>
          </v-row>
        </customCol>

        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Correo*</labelCol>
            <v-col>
              <v-text-field
                ref="email"
                v-model="email"
                solo
                flat
                outlined
                label="Escribe el correo institucional"
                :rules="[
                  () => !!email || 'Campo requerido',
                  () => !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email inválido',
                ]"
                required
              />
            </v-col>
          </v-row>
        </customCol>

        <customCol v-if="!ismobil" class="d-none d-md-flex d-lg-flex d-xl-flex" style="min-height: 74px"> </customCol>

        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Entidad*</labelCol>
            <v-col>
              <v-select
                :items="entidades"
                v-model="entidad"
                flat
                outlined
                solo
                label="Seleccione entidad"
                v-bind="$props"
                required
                :rules="rules.entidadrequired"
              />
            </v-col>
          </v-row>
        </customCol>

        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Cargo*</labelCol>
            <v-col>
              <v-text-field
                ref="cargo"
                v-model="cargo"
                solo
                flat
                outlined
                label="Escribe el cargo"
                :rules="[() => !!cargo || 'Campo requerido']"
                required
              />
            </v-col>
          </v-row>
        </customCol>

        <customCol :class="[ismobil, { 'mt-9': ismobil }]">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="[{ 'mt-minus-28': !ismobil }]">
              Permisos
              <v-icon color="warning">mdi-help-circle</v-icon>
            </labelCol>
            <v-col>
              <dx-select :items="permisos_select" @get-selected="get_permisos" label="Seleccione permisos" multiple v-bind="$props" closableItems>
              </dx-select>
            </v-col>
          </v-row>
        </customCol>
        <customCol :class="[ismobil, { 'mt-16': ismobil }]">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Seguidor</labelCol>
            <v-col>
              <dx-select :items="seguidores" v-model="seguidor" solo flat outlined label="Seleccione seguidor" v-bind="$props" ripple="true" />
            </v-col>
          </v-row>
        </customCol>
        <customCol :class="ismobil">
          <v-row :class="['align-center', ismobil]">
            <labelCol :class="['mt-minus-28', !ismobil]">Subrogante</labelCol>
            <v-col>
              <v-select :items="subrogantes" v-model="subrogante" label="Seleccione subrogante" solo flat outlined v-bind="$props" ripple="true" />
            </v-col>
          </v-row>
        </customCol>

        <customCol :class="[ismobil, { 'mt-3': ismobil }, { 'mb-10': ismobil }]">
          <v-row :class="[{ 'align-center': ismobil }]" style="max-height: 74px">
            <v-col cols="auto" class="flex font-20 mt-2" sryle="height: 100%">Activar subrogancia</v-col>
            <v-col style="max-height: 72px">
              <doc-switch class="d-inline-block mt-0 pt-0 success-switch" style="width: 40px" v-model="subrogancia" inset :ripple="false" dense>
              </doc-switch>
              <v-icon color="warning" style="margin-top: -4px">mdi-help-circle</v-icon>
            </v-col>
          </v-row>
        </customCol>
        <div :class="['pr-2', { 'align-center': ismobil == 'ismobil' }, { 'align-right': ismobil == '' }, 'mt-12']">
          <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2">
            <span class="text-underline"> Cancelar </span>
          </dx-button>

          <dx-button color="white" outlined v-bind="$props" class="text-none primary" @click="submit">
            <span class="text-underline"> Crear nuevo usuario </span>
          </dx-button>
        </div>
      </div>
    </perfect-scrollbar>
  </v-row>
</template>

<script>
const labelCol = {
  template: `
    <v-col cols="auto" style="min-width: 140px; max-width: 140px" class="flex font-20 line-height-22 py-1"><slot /></v-col>
  `,
}
const customCol = {
  template: `
    <v-col cols="5" style="max-height: 74px; float:left;"><slot /></v-col>
  `,
}

export default {
  components: {
    labelCol,
    customCol,
  },
  data() {
    return {
      entidades: ['Entidad 1', 'Entidad 2'],
      permisos_select: ['Administrador', 'otro'],
      subrogantes: ['Subragante 1', 'Subragante 2'],
      seguidores: ['Miguel', 'Juan'],
      labelClass: 'text-body-1 font-20',
      errorMessages: '',
      formHasErrors: false,
      subrogancia: true,
      name: null,
      rut: null,
      rut_dv: null,
      name: null,
      lastname: null,
      email: null,
      cargo: null,
      entidad: [],
      permisos: [],
      seguidor: [],
      subrogante: [],
      breadcrumbs: [
        {
          text: 'Administración',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Usuarios',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Nuevo Usuario',
          disabled: true,
          href: '',
        },
      ],
      rules: {
        entidadrequired: [v => !!v || 'Campo requerido'],
      },
    }
  },

  computed: {
    form() {
      return {
        name: this.name,
        lastname: this.lastname,
        rut: this.rut,
        rut_dv: this.rut_dv,
        email: this.email,
        cargo: this.cargo,
        entidad: this.entidad,
      }
    },
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
  },

  watch: {},

  methods: {
    addressCheck() {
      this.errorMessages = !this.name ? `Campos requeridos vacíos` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        console.log(f)
        console.log(this.$refs[f])
        // this.$refs[f].validate(true)
      })
    },
    get_permisos(permisos_) {
      console.log(permisos_)
      this.permisos = permisos_
    },
  },
}
</script>
<style lang="scss">
.row.ismobile {
  display: block;
}
.col-5.ismobile {
  min-width: 100% !important;
  margin-top: 50px;
}
.col-5 {
  min-width: 450px;
}
.align-right {
  text-align: right;
  float: right;
  margin-right: 9px !important;
  width: 100%;
}
.mt-minus-28 {
  margin-top: -28px;
}

.v-text-field__details {
  min-width: 120px;
}

@include theme(v-input--switch) using ($material) {
  &.v-input.success-switch.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-input--selection-controls.v-input--switch.v-input--switch--inset.primary--text
    .primary--text {
    color: map-deep-get($material, 'colors', 'success') !important;
    caret-color: map-deep-get($material, 'colors', 'success') !important;
  }
  &.v-input.success-switch.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-input--selection-controls.v-input--switch.v-input--switch--inset.primary--text
    .v-input--switch__thumb.primary--text {
    color: map-deep-get($material, 'colors', 'light') !important;
    caret-color: map-deep-get($material, 'colors', 'light') !important;
  }
}
</style>
