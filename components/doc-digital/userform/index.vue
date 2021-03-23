<template>
<v-container class="px-0" dx-userform>
    <v-row no-gutters :class="['mt-1 user-form']">
        <div class="col-sm-12">
            <dx-bodytitle v-if="!ismobil">
                <template v-slot:title>
                    <div class="weight-700 line-height-31 font-25">{{ headtitle }}</div>
                </template>
            </dx-bodytitle>
            <div class="weight-700 line-height-31 font-25 mb-10" v-else>{{ headtitle }}</div>
        </div>
        <v-col cols="12" class=" mt-9">
            <div class="weight-400 line-height-30 font-16">{{ headtext }}</div>
        </v-col>
        <!-- <div class="mt-4" ref="form" > -->
        <v-form ref="form" class="mt-4" style="min-height: 680px" v-model="valid" lazy-validation>
            <div v-if="userid" class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="[{ 'align-center': ismobil }]">
                    <v-col cols="auto" style="max-height: 74px; min-width: 140px; max-width: 140px" :class="['weight-400 line-height-30 font-16 py-1', { 'mt-5': !ismobil }]">Estado</v-col>
                    <v-col style="max-height: 72px; line-height: 74px;">
                        Activo
                        <v-switch class="d-inline-block mt-0 pt-0 success-switch ml-4" style="width: 40px" v-model="isBloqueado" inset :ripple="false" dense>
                        </v-switch>
                    </v-col>
                </v-row>
            </div>
            <div class="col-md-12 col-sm-12 px-0 mr-10 d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil" style="min-height: 30px"> </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">RUT*</v-col>
                    <v-col class="mh-72">
                        <v-text-field v-model="run" solo flat outlined :rules="rules.rutVerifier" :error-messages="errorMessages" label="99.999.999" style="width: 108px" required class="d-inline-block" :disabled="disabled" />
                        -
                        <v-text-field v-model="dv" solo flat outlined :rules="rules.dvVerifier" :error-messages="errorMessages" label="K" style="width: 37px" required class="d-inline-block" :disabled="disabled" />
                    </v-col>
                </v-row>
            </div>
            <div class="col-md-5 col-sm-12 px-0 mr-10 d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil" style="min-height: 74px"> </div>
            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Nombre(s)*</v-col>
                    <v-col class="mh-72">
                        <v-text-field v-model="nombres" solo flat outlined :rules="[() => !!nombres || 'Campo requerido']" label="Nombre Nombre" required :disabled="disabled" />
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Apellido(s)*</v-col>
                    <v-col class="mh-72">
                        <v-text-field  v-model="apellidos" solo flat outlined label="Apellido Apellido" :rules="[() => !!apellidos || 'Campo requerido']" required :disabled="disabled" />
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Correo*</v-col>
                    <v-col class="mh-72">
                        <v-text-field  v-model="correoInstitucional" solo flat outlined label="Escribe el correo institucional" :rules="[
                  () => !!correoInstitucional || 'Campo requerido',
                  () => !correoInstitucional || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(correoInstitucional) || 'Email inválido',
                ]" required />
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10 d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil" style="min-height: 74px"> </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Entidad*</v-col>
                    <v-col class="mh-72">
                        <v-select :items="entidades" v-model="entidad" flat outlined :ripple="false" solo label="Seleccione entidad" v-bind="$props" required :rules="!disabled ? rules.entidadrequired : []" :disabled="disabled" item-text="name" item-value="id" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" />
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Cargo*</v-col>
                    <v-col class="mh-72">
                        <v-text-field v-model="cargo" solo flat outlined label="Escribe el cargo" :rules="[() => !!cargo || 'Campo requerido']" required />
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col style="min-width: 140px" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28 col-4': !ismobil }]">
                        <div style="width: 70%; float: left; max-width: 160px">Permisos adicionales</div>
                        <v-icon color="warning" :class="['ml-2', { 'mt-5': !ismobil }, { 'mt-1': ismobil }]" style="float: left">mdi-help-circle</v-icon>
                    </v-col>
                    <!-- <div :class="['label-width1 col col-auto flex weight-400 line-height-30 font-16 py-1' , { 'mt-minus-28': !ismobil }]">
                Permisos adicionales
                <v-icon color="warning" :class="[{'icon-margins' : !ismobil}]" style="">mdi-help-circle</v-icon>
            </div > -->
                    <div class="col-md-5 col-sm-12 px-0 mr-10" v-if="ismobil" style="min-height: 30px"> </div>
                    <v-col>
                        <dx-select :items="roles_select" @get-selected="get_roles" label="Seleccione roles" item-text="name" item-value="id" multiple v-bind="$props" closableItems :disabled="disabled" :ripple="false">
                        </dx-select>
                    </v-col>
                </v-row>
            </div>
            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Seguidor</v-col>
                    <v-col>
                        <!-- <dx-select :items="seguidores" v-model="seguidor" solo flat outlined label="Seleccione seguidor" v-bind="$props" :ripple="false" /> -->
                        <v-autocomplete append-icon="" :ripple="false" solo flat multiple outlined v-model="seguidor" :items="seguidores" :loading="isLoading" hide-details hide-selected item-text="name" item-value="id" label="Seleccione seguidor" no-data-text="No existen coincidencias">
                            <template v-slot:selection="{ item }">
                                <dx-badge type="tertiary" label outlined class="mx-1 my-1">
                                    <div class="darken3--text font-16 line-height-22 weight-400 textbreak" :title=" item.name "> {{ item.name }}</div>
                                    <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="removeItem(item)"> mdi-close </dx-icon>
                                </dx-badge>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </div>
            <div class="col-md-12 col-sm-12 px-0 py-0 mr-10 d-none d-md-flex d-lg-flex d-xl-flex" v-if="!ismobil" style="min-height: 1px"> </div>
            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                <v-row no-gutters :class="['align-center', ismobil]">
                    <v-col cols="auto" class="label-width" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Subrogante</v-col>
                    <v-col>
                        <!-- <v-text-field v-model="subrogante" solo flat outlined label="Seleccione subrogante" /> -->
                        <!-- <v-select :items="subrogantes" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" v-model="subrogante" label="Seleccione subrogante" solo flat outlined v-bind="$props" :ripple="false" /> -->
                        <v-autocomplete append-icon="" :ripple="false" solo flat outlined v-model="subrogante" :items="subrogantesByEntity" :loading="isLoading" hide-details hide-selected item-text="name" item-value="id" label="Seleccione subrogante" no-data-text="No existen coincidencias">
                            <template v-slot:selection="{ item }">
                                <dx-badge type="tertiary" label outlined class="mx-1 my-1">
                                    <div class="darken3--text font-16 line-height-22 weight-400 textbreak">{{ item.name }}</div>
                                    <dx-icon left class="darken3--text ml-2 mr-0" @click.prevent="subrogante=null"> mdi-close </dx-icon>
                                </dx-badge>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
            </div>

            <div class="col-md-5 col-sm-12 px-0 mr-10" :class="[ismobil, { 'mb-10': ismobil }, 'col-container']">
                <v-row no-gutters :class="[{ 'align-center': ismobil }]">
                    <v-col cols="auto" :class="['flex weight-400 line-height-30 font-16', { 'mt-3': !ismobil }, {'mt-minus-28': ismobil }]" sryle="height: 100%">Activar subrogancia</v-col>
                    <v-col style="max-height: 72px" :class="[{ 'mt-1': !ismobil }]">
                        <v-switch class="d-inline-block mt-0 pt-0 success-switch" style="width: 40px" v-model="isSubroganteActivado" inset :ripple="false" dense :disabled="disabled">
                        </v-switch>
                        <v-icon color="warning" style="margin-top: -4px">mdi-help-circle</v-icon>
                    </v-col>
                </v-row>
            </div>
            <div :class="['pr-2', { 'text-center': ismobil }, { 'align-right': !ismobil }, 'mt-12']">
                <dx-button color="primary" outlined v-bind="$props" class="text-none mr-2 bg-white" to="/administracion/usuarios">
                    <span class="text-underline"> Cancelar </span>
                </dx-button>

                <dx-button color="white" outlined v-bind="$props" :class="[{ 'ml-5': !ismobil }, { 'ml-2': ismobil }, 'text-none primary']" @click="submit" style="min-width: 107px">
                    <span class="text-underline"> {{ btntext }} </span>
                </dx-button>
            </div>
        </v-form>
    </v-row>
</v-container>
</template>

<script>
import {
    isValidResponse
} from '~/shared/utils/request'

import {
    verificationDigit,
    verifyRut
} from '~/shared/utils/rut-validator'
import {
    lowerCase,
    trim,
    escapeRegExp
} from '~/shared/utils/string'
export default {
    name: 'userform',
    props: {
        userid: {
            type: String,
            default: ''
        },
    },
    async fetch() {
        this.$store.dispatch('entidades/getEntities')
    },
    updated() {

    },
    mounted() {
        const user = this.$store.getters['usuarios/getSelectedUser']
        const activos = this.$store.getters['usuarios/getActivos']

        if (user) {
            this.isSubroganteActivado = user.isSubroganteActivado
            this.isBloqueado = !user.isBloqueado
            this.nombres = user.nombres
            this.run = user.run
            this.dv = user.dv
            this.apellidos = user.apellidos
            this.correoInstitucional = user.correoInstitucional
            this.cargo = user.cargo
            this.entidad = user.entidad.id
            this.roles = user.roles,
                this.seguidor = user.seguidor
        }
        this.seguidores = activos.map(({
            id,
            nombres
        }) => {
            return {
                id,
                name: nombres
            }
        })
        // console.log(this.seguidores)
    },
    data() {
        return {
            subrogantes: ['Subragante 1', 'Subragante 2'],
            labelClass: 'text-body-1 font-20',
            errorMessages: '',
            formHasErrors: false,
            isSubroganteActivado: true,
            isBloqueado: false,
            nombres: null,
            run: null,
            dv: null,
            apellidos: null,
            correoInstitucional: null,
            cargo: null,
            entidad: null,
            roles: [],
            subrogante: null,
            breadcrumbs: [{
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
                entidadrequired: [(v) => (v && !!v) || 'Campo requerido'],
                rutVerifier: [
                    (v) => !!v || !!this.dv || 'Campo requerido',
                    (v) => verifyRut(v + '-' + this.dv, false) || 'Rut inválido',
                    ],                    
                dvVerifier: [
                    (v) => !!v || !!this.dv || '',
                    // (v) => verifyRut(v + '-' + this.dv, false) || 'Rut inválido',
                    ]
                
            },
            roles_select: [
                // {
                //   key : 'ROLE_USUARIO',
                //   name : 'Operador'
                // },
                {
                    id: 'ROLE_VER_RESERVADOS',
                    name: 'Ver reservados'
                },
                {
                    id: 'ROLE_OFICINA_PARTES',
                    name: 'Oficina de partes'
                },
                {
                    id: 'ROLE_ADMIN',
                    name: 'Administrador'
                },
                {
                    id: 'ROLE_JEFE_SERVICIO',
                    name: 'Jefe de servicio'
                },
                {
                    id: 'ROLE_SUPERADMIN',
                    name: 'Súper administrador'
                }
            ],
            isLoading: false,
            seguidores: [],
            seguidor: null,
            searchSeguidores: null,
            valid: true,
        }
    },

    computed: {
        entidades() {
            let list = []
            try {
                list = this.$store.getters['entidades/getEntities']
            } catch (err) {}
            return list.map(({
                id,
                nombre
            }) => {
                return {
                    id,
                    name: nombre
                }
            })
        },
        // form() {
        //     return {
        //         nombres: this.nombres,
        //         apellidos: this.apellidos,
        //         run: this.run,
        //         dv: this.dv,
        //         correoInstitucional: this.correoInstitucional,
        //         cargo: this.cargo,
        //         entidad: this.entidad,
        //     }
        // },
        ismobil() {
            return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs ? 'ismobile' : ''
        },
        disabled() {
            return this.userid > 0
        },
        headtitle() {
            return !this.userid ? 'Nuevo usuario' : 'Editar usuario'
        },
        headtext() {
            return !this.userid ? 'Complete el formulario para crear un nuevo usuario.' : 'Complete el formulario para editar el usuario.'
        },
        btntext() {
            return !this.userid ?
                !this.$vuetify.breakpoint.xs ?
                'Crear nuevo usuario' :
                'Agregar' :
                !this.$vuetify.breakpoint.xs ?
                'Editar usuario' :
                'Guardar'
        },
        subrogantesByEntity(){
            let getByEntity = this.$store.getters['usuarios/getByEntity']
            let usuarios =  getByEntity(this.entidad)
            return usuarios.map(({id, nombres}) => {
                return {id, name:nombres}
            })
        }
    },

    watch: {
        searchSeguidores(val) {},
    },

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
            let resp = null
            const entlist = this.$store.getters['entidades/getEntities']
            let index = entlist.findIndex((obj => (obj.id == this.entidad)))
            const entidad = entlist[index]

             if (this.$refs.form.validate()) {
                let user = {
                    isSubroganteActivado: this.isSubroganteActivado,
                    isBloqueado: !this.isBloqueado,
                    nombres: this.nombres,
                    run: this.run,
                    dv: this.dv,
                    apellidos: this.apellidos,
                    correoInstitucional: this.correoInstitucional,
                    cargo: this.cargo,
                    entidad: entidad,
                    roles: this.roles,
                    seguidor: this.seguidor,
                    subrogante: this.subrogante,
                    id: this.userid
                }
                try {
                    if (this.userid)
                        resp = await this.$store.dispatch('usuarios/updateUser', user)
                    else
                        resp = await this.$store.dispatch('usuarios/insertUser', user)
                } catch (error) {}

                const [valid, Toast] = isValidResponse(resp)

                if (valid) {
                    if (this.userid)
                        Toast.success({
                            message: 'Usuario actualizado exitósamente',
                        })
                    else
                        Toast.success({
                            message: 'Usuario creado exitósamente',
                        })

                    this.$router.replace('/administracion/usuarios')

                } else {
                    if (this.userid)
                        Toast.error({
                            message: 'Ha ocurrido un error al actualizar el usuario',
                        })
                    else
                        Toast.error({
                            message: 'Ha ocurrido un error al crear el usuario',
                        })
                }
            }
        },
        get_roles(roles_) {
            this.roles = roles_
        },
        removeItem(item) {
            this.seguidores = this.seguidores.filter(function (val) {
                return item !== val
            })
        },
        
    },
}
</script>

<style lang="scss" scoped>
.user-form {
    .col {
        flex-basis: 0;
        flex-grow: 1;
    }

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

    .v-text-field--outlined>.v-input__control>.v-input__slot {
        min-height: 48px;
        border-radius: 0px;
    }

    .col-container {
        min-height: 74px;
        float: left;
        padding: 0px !important
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

    .label-width {
        min-width: 140px;
        max-width: 140px;
        display: table-cell;
    }

    .label-width1 {
        min-width: 140px;
        max-width: 140px;
        display: table-cell;
    }

    .icon-margins {
        margin: -31px 0px 0 13px;
    }

    .mh-72 {
        max-height: 72px;
    }    
    .textbreak{
      max-width: rem-calc(140px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
}

@include theme(v-input--switch) using ($material) {
    &.v-input.success-switch.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-input--selection-controls.v-input--switch.v-input--switch--inset.primary--text .primary--text {
        color: map-deep-get($material, 'colors', 'success') !important;
        caret-color: map-deep-get($material, 'colors', 'success') !important;
    }

    &.v-input.success-switch.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--light.v-input--selection-controls.v-input--switch.v-input--switch--inset.primary--text .v-input--switch__thumb.primary--text {
        color: map-deep-get($material, 'colors', 'light') !important;
        caret-color: map-deep-get($material, 'colors', 'light') !important;
    }
}
</style>
