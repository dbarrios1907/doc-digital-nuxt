<template>
  <v-container>
    <v-row :class="['mt-1 user-form']">
      <dx-bodytitle v-if="!ismobil" class="px-3">
        <template v-slot:title>
          <div class="weight-700 line-height-31 font-25">{{ headtitle }}</div>
        </template>
      </dx-bodytitle>
      <div class="weight-700 line-height-31 font-25 mb-10" v-else>{{ headtitle }}</div>
      <v-col cols="12 d-none d-md-flex d-lg-flex d-xl-flex mt-9">
        <div class="weight-400 line-height-30 font-16">{{ headtext }}</div>
      </v-col>
      <div class="mt-2" ref="form" style="min-height: 680px">
        <v-col v-if="user" cols="12" style="max-height: 74px">
          <v-row :class="[{ 'align-center': ismobil }]" style="max-height: 74px">
            <v-col
              cols="auto"
              style="max-height: 74px; min-width: 140px; max-width: 140px"
              :class="['weight-400 line-height-30 font-16 py-1', { 'mt-5': !ismobil }]"
              >Estado</v-col
            >
            <v-col style="max-height: 72px">
              <span style="min-width: 140px; max-width: 140px" class="flex weight-400 line-height-30 font-16 py-1">Activo</span>
              <v-switch class="d-inline-block mt-0 pt-0 success-switch ml-4" style="width: 40px" v-model="isBloqueado" inset :ripple="false" dense>
              </v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" style="max-height: 74px">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >RUT*</v-col
            >
            <v-col>
              <v-text-field
                ref="run"
                v-model="run"
                solo
                flat
                outlined
                :rules="[() => !!run || !!dv || 'Campo requerido']"
                :error-messages="errorMessages"
                label="99.999.999"
                style="width: 108px"
                required
                class="d-inline-block"
                :disabled="disabled"
              />
              -
              <v-text-field
                ref="dv"
                v-model="dv"
                solo
                flat
                outlined
                :error-messages="errorMessages"
                label="K"
                style="width: 37px"
                required
                class="d-inline-block"
                :disabled="disabled"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Nombre(s)*</v-col
            >
            <v-col>
              <v-text-field
                ref="nombres"
                v-model="nombres"
                solo
                flat
                outlined
                :rules="[() => !!nombres || 'Campo requerido']"
                label="Nombre Nombre"
                required
                :disabled="disabled"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Apellido(s)*</v-col
            >
            <v-col>
              <v-text-field
                ref="apellidos"
                v-model="apellidos"
                solo
                flat
                outlined
                label="Apellido Apellido"
                :rules="[() => !!apellidos || 'Campo requerido']"
                required
                :disabled="disabled"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Correo*</v-col
            >
            <v-col>
              <v-text-field
                ref="correoInstitucional"
                v-model="correoInstitucional"
                solo
                flat
                outlined
                label="Escribe el correo institucional"
                :rules="[
                  () => !!correoInstitucional || 'Campo requerido',
                  () => !correoInstitucional || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(correoInstitucional) || 'Email inválido',
                ]"
                required
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" v-if="!ismobil" class="d-none d-md-flex d-lg-flex d-xl-flex" style="min-height: 74px"> </v-col>

        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Entidad*</v-col
            >
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
                :disabled="disabled"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Cargo*</v-col
            >
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
        </v-col>

        <v-col cols="5" :class="[ismobil, { 'mt-13': ismobil }, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col style="min-width: 140px" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28 col-4': !ismobil }]">
              <div style="width: 70%; float: left">Permisos adicionales</div>
              <v-icon color="warning" :class="['ml-2 mt-3', { 'd-none': ismobil }]" style="float: left">mdi-help-circle</v-icon>
            </v-col>
            <v-col :class="[{ 'col-8': !ismobil }, { 'mt-6': ismobil }]">
              <dx-select
                :items="roles_select"
                @get-selected="get_roles"
                label="Seleccione roles"
                item-text="name"
                item-value="key"
                multiple
                v-bind="$props"
                closableItems
                :disabled="disabled"
              >
              </dx-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5" :class="[ismobil, { 'mt-14': ismobil }, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Seguidor</v-col
            >
            <v-col>
              <dx-select :items="seguidores" v-model="seguidor" solo flat outlined label="Seleccione seguidor" v-bind="$props" ripple="true" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5" :class="[ismobil, 'col-container']">
          <v-row :class="['align-center', ismobil]">
            <v-col
              cols="auto"
              style="min-width: 140px; max-width: 140px"
              :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]"
              >Subrogante</v-col
            >
            <v-col>
              <v-select :items="subrogantes" v-model="subrogante" label="Seleccione subrogante" solo flat outlined v-bind="$props" ripple="true" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" :class="[ismobil, { 'mt-3': !ismobil }, { 'mb-10': ismobil }, 'col-container']">
          <v-row :class="[{ 'align-center': ismobil }]" style="max-height: 74px">
            <v-col cols="auto" :class="['flex weight-400 line-height-30 font-16', { 'mt-3': !ismobil }]" sryle="height: 100%"
              >Activar isSubroganteActivado</v-col
            >
            <v-col style="max-height: 72px">
              <v-switch
                class="d-inline-block mt-0 pt-0 success-switch"
                style="width: 40px"
                v-model="isSubroganteActivado"
                inset
                :ripple="false"
                dense
                :disabled="disabled"
              >
              </v-switch>
              <v-icon color="warning" style="margin-top: -4px">mdi-help-circle</v-icon>
            </v-col>
          </v-row>
        </v-col>
        <div :class="['pr-2', { 'text-center': ismobil }, { 'align-right': !ismobil }, 'mt-12']">
          <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2 bg-white" to="/administracion/usuarios">
            <span class="text-underline"> Cancelar </span>
          </dx-button>

          <dx-button
            color="white"
            outlined
            v-bind="$props"
            :class="[{ 'ml-5': !ismobil }, { 'ml-2': ismobil }, 'text-none primary']"
            @click="submit"
            style="min-width: 107px"
          >
            <span class="text-underline"> {{ btntext }} </span>
          </dx-button>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { isValidResponse } from '~/shared/utils/request'
export default {
  name: 'userform',
  props:{
    userid:{
      type: String,
      default: ''
    },
    user:{
      type: Object,
      default: null
    }
  },
  data() {
    return {
      entidades: ['Entidad 1', 'Entidad 2'],
      // roles_select: ['ROLE_USUARIO', 'ROLE_OFICINA_PARTES', 'ROLE_ADMIN', 'ROLE_SUPERADMIN', 'ROLE_JEFE_SERVICIO'],
      subrogantes: ['Subragante 1', 'Subragante 2'],
      seguidores: ['Miguel', 'Juan'],
      labelClass: 'text-body-1 font-20',
      errorMessages: '',
      formHasErrors: false,
      isSubroganteActivado: true,
      isBloqueado: true,
      nombres: null,
      run: null,
      dv: null,
      apellidos: null,
      correoInstitucional: null,
      cargo: null,
      entidad: [],
      roles: [],
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
      roles_select:[
        {
          key : 'ROLE_USUARIO',
          name : 'Operador'
        },
        {
          key : 'ROLE_VER_RESERVADOS',
          name : 'Ver reservados'
        },
        {
          key : 'ROLE_OFICINA_PARTES',
          name : 'Oficina de partes'
        },
        {
          key : 'ROLE_ADMIN',
          name : 'Administrador'
        },
        {
          key : 'ROLE_JEFE_SERVICIO',
          name : 'Jefe de servicio'
        },
        {
          key : 'ROLE_SUPERADMIN',
          name : 'Súper administrador'
        }
      ]
    }
  },


  computed: {
    form() {
      return {
        nombres: this.nombres,
        apellidos: this.apellidos,
        run: this.run,
        dv: this.dv,
        correoInstitucional: this.correoInstitucional,
        cargo: this.cargo,
        // entidad: this.entidad,
      }
    },
    ismobil() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    disabled() {
      return this.user
    },
    headtitle() {
      return !this.user ? 'Nuevo usuario' : 'Editar usuario'
    },
    headtext() {
      return !this.user ? 'Complete el formulario para crear un nuevo usuario.' : 'Complete el formulario para editar el usuario.'
    },
    btntext() {
      return !this.user
        ? !this.$vuetify.breakpoint.xs
          ? 'Crear nuevo usuario'
          : 'Agregar'
        : !this.$vuetify.breakpoint.xs
        ? 'Editar usuario'
        : 'Guardar'
    },
  },

  watch: {},

  methods: {
    addressCheck() {
      this.errorMessages = !this.nombres ? `Campos requeridos vacíos` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    async submit() {
      this.formHasErrors = false  
      let resp = null
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      if(!this.formHasErrors){
          let user = 
            {
                isSubroganteActivado: this.isSubroganteActivado,
                isBloqueado: this.isBloqueado,
                nombres: this.nombres,
                run: this.run,
                dv: this.dv,
                apellidos: this.apellidos,
                correoInstitucional: this.correoInstitucional,
                cargo: this.cargo,
                entidad: this.entidad,
                roles: this.roles,
                seguidor: this.seguidor,
                subrogante: this.subrogante,
            }
        if(this.userid){}
        else
          try{
            resp = await this.$store.dispatch('usuarios/insertUser', user)
          }catch(error) {console.log(error)}

        const [valid, Toast] = isValidResponse(resp)

        console.log(resp)

        if (valid) {
          Toast.success({
            message: 'Usuario creado exitósamente',
          })
          this.$auth.redirect('/administracion/usuarios', false)
        }
        else{
           Toast.error({
            message: 'Ha ocurrido un error al crear el usuario',
          })
        }
      }
    },
    get_roles(roles_) {
      // console.log(roles_)
      this.roles = roles_
    },
  },
}
</script>
<style lang="scss">
.user-form {
  .row.ismobile {
    display: block;
  }
  .col-5.ismobile {
    min-width: 100% !important;
    margin-top: 50px;
  }
  .col-5 {
    min-width: 450px;
    padding: 13px !important;
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

  .v-text-field--outlined > .v-input__control > .v-input__slot {
    min-height: 48px;
    border-radius: 0px;
  }

  .col-container {
    max-height: 74px;
    float: left;
  }
  .help-icon {
    width: 18px !important;
    height: 18px !important;
  }
  .v-input--switch__track {
    width: 38px !important;
  }
  .bg-white:before {
    background-color: transparent !important;
  }
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
