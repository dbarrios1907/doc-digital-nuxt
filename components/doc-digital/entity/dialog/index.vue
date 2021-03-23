<template>
<v-dialog entity-dialog overlay-opacity="0.55" :fullscreen="ismobil == 'ismobile'" :data="data" rlay-color="#001C41" v-model="dialog" max-width="672px" :content-class="'entity-dialog'">
    <v-card>
        <v-card-title>
            <h5 class="font-title weight-700 darken3--text font-roboto">{{headerTitle}}</h5>
            <v-spacer></v-spacer>
            <slot name="actionclose" />
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text class="mt-6 py-6">
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Nombre *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-text-field v-model="nombre" solo flat outlined :rules="[() => !!nombre || 'Campo requerido']" label="Nombre" required />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Entidad dependiente *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-select :items="entidades" v-model="entidadDependencia" flat outlined :ripple="false" solo label="Seleccione la entidad" v-bind="$props" required :rules="rules.selectRequired" item-text="name" item-value="id" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Correo Oficina de Partes *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-text-field  v-model="correoOficinaPartes" solo flat outlined label="Escribe el correo" :rules="rules.correoRules" required />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Región *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-select @change="getProvincias" :items="regiones" v-model="region" flat outlined :ripple="false" solo label="Seleccione la entidad" v-bind="$props" required :rules="rules.selectRequired" item-text="name" item-value="id" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Provincia *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-select  @change="getComunas"  :items="provincias" v-model="provincia" flat outlined :ripple="false" solo label="Seleccione la entidad" v-bind="$props" required :rules="rules.selectRequired" item-text="name" item-value="id" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row no-gutters :class="['mt-1 entity-form']">
                    <div class="col-md-12 col-sm-12 px-0 mr-10" :class="[ismobil, 'col-container']">
                        <v-row no-gutters :class="['align-center', ismobil]">
                            <v-col cols="auto" class="label-width col-md-5 col-sm-5" :class="['flex weight-400 line-height-30 font-16 py-1', { 'mt-minus-28': !ismobil }]">Comuna *</v-col>
                            <v-col class="mh-72  col-md-7 col-sm-12">
                                <v-select :items="comunas" v-model="comuna" flat outlined :ripple="false" solo label="Seleccione la entidad" v-bind="$props" required :rules="rules.selectRequired" item-text="name" item-value="id" :menu-props="{ bottom: true, offsetY: true, openOnClick: false }" />
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
            </v-card-text>
        </v-form>

        <v-card-actions>
            <div :class="['pr-2 mb-7', { 'text-center': ismobil }, { 'text-right': !ismobil }]" style="width:100%">
                <!-- <slot name="actions" /> -->
                <dx-button color="primary" outlined v-bind="$props" class="text-none" @click="close">
                    <span class="text-underline"> Cancelar </span>
                </dx-button>
                <dx-button color="white" @click="submitForm" outlined v-bind="$props" :class="[{ 'ml-4': ismobil }]" class="text-none ml-5 mr-1 primary">
                    <span class="text-underline"> {{btnText}} </span>
                </dx-button>
            </div>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import { isValidResponse } from '~/shared/utils/request'
export default {
    name: 'entity-dialog',
    props: {
        dialog: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: null,
        },
    }, 
    data() {
        return {
            entidadDependencia: null,
            correoOficinaPartes: null,
            nombre: null,
            region: null,
            provincia: null,
            provincias: [],
            comuna: null,
            comunas: [],
            rules: {
                selectRequired: [(v) => (v && !!v) || 'Campo requerido'],
                correoRules: [
                    (v) => !!v || 'Campo requerido',
                    (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email inválido',
                ]
            },
            valid: true,
        }
    },
    methods: {
      async submitForm () {
        let failedSubmit = false 
        if (this.$refs.form.validate())
            {
                let resp = null
                let entity = {
                        id: this.data ? this.data.id : 0,
                        comuna: {},
                        correoOficinaPartes: this.correoOficinaPartes,
                        nombre: this.nombre,
                        provincia: {},
                        region: {}
                        }
                try{
                    if(!this.data)
                        resp = await this.$store.dispatch('entidades/insertEntity', entity)
                    else
                        resp = await this.$store.dispatch('entidades/updateEntity', entity)
                    
                    const [valid, Toast] = isValidResponse(resp)
                    if (valid) {
                        Toast.success({
                            message: this.data ? 'Entidad actualizada' :'Entidad insertada',
                        })
                    }
                    else
                        Toast.error({
                            message: this.data ? 'No se pudo actualizar la entidad' : 'No se pudo insertar la entidad',
                        })

                }catch(err){
                    failedSubmit = true                    
                    Toast.error({
                        message: 'Ha ocurrido un error, intente nuevamente',
                    })
                }
                this.$refs.form.reset()
                this.$emit('sumbit', failedSubmit)
            }
      },
      close () {
        this.$refs.form.reset()
        this.$emit('close')
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async getProvincias(region){
          try{
              let  resp = await this.$store.dispatch('entidades/getProvincias', region)
              this.provincias = resp
              this.comunas = []
          }catch(err){console.log(err)}          
      },      
      async getComunas(provincia){
          try{
              let  resp = await this.$store.dispatch('entidades/getComunas', provincia)
              this.comunas = resp
          }catch(err){console.log(err)}          
      }
    },
    computed: {    
        ismobil() {
            return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'ismobile' : ''
        },
        headerTitle() {
            const entity = this.data
            if(entity){
                this.entidadDependencia = entity.entidadDependencia
                this.correoOficinaPartes = entity.correoOficinaPartes
                this.nombre = entity.nombre
                this.region = entity.region ? entity.region.id : null
                this.provincia = entity.provincia ? entity.provincia.id : null
                this.comuna = entity.comuna ? entity.comuna.id : null
            }
            return this.data ? "Editar entidad" : "Nueva entidad"
        },
        btnText() {
            return this.data ? "Guardar" : "Agregar"
        },
        entidades() {
            const entidades = this.$store.getters['entidades/getEntities']
            return entidades.map(({
                id,
                nombre
            }) => {
                return {
                    id,
                    name: nombre
                }
            })
        },
        regiones() {
            const regiones = this.$store.getters['entidades/getRegions']
            return regiones
        },
    },
}
</script>

<style lang="scss" scoped>
.entity-dialog {
    .mh-72{
        max-height: 72px;
    }
    .mt-minus-50 {
        margin-top: -50px;
    }
}
</style>
