<template>
<v-dialog notification-dialog overlay-opacity="0.55" persistent :fullscreen="ismobil == 'ismobile'" :data="data" rlay-color="#001C41" v-model="dialog" max-width="672px" :content-class="'notification-dialog'">
    <v-card>
        <v-card-title>
            <h5 class="font-title weight-700 darken3--text font-roboto">Editar correo de notificación</h5>
            <v-spacer></v-spacer>
            <slot name="actionclose" />
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text class="mt-6 py-6 px-7">
                <v-row no-gutters :class="['mt-1 notification-form']"> 
                     <div style="height: 300px" v-if="!ismobil" class="col-container col-md-4 col-sm-4 px-0 mr-md-12">
                         <div class="weight-400 font-12 mb-3"> Previsualización: </div>
                         <iframe :srcdoc="body_" frameborder="0" class="bg-grey1" style="width: 100%; height: 100%"></iframe>
                     </div>
                      <div class="col-container col-md-7 col-sm-7 px-0">
                           <v-row no-gutters :class="['mt-1 nofitication-form']">
                                <div class="col-md-12 col-sm-12 px-0 mr-md-10 mh-72" :class="[ismobil, 'col-container']">
                                    <v-row no-gutters :class="['align-center', ismobil]">
                                        <v-col cols="auto" class="label-width col-md-3 col-sm-3 flex weight-400 line-height-30 font-16 py-1">Nombre</v-col>
                                        <v-col class="mh-72  col-md-9 col-sm-12">
                                            <v-text-field v-model="nombre" solo flat outlined  label="Escribe el nombre acá" />
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-row>
                            <v-row no-gutters :class="['mt-1 nofitication-form']">
                                <div class="col-md-12 col-sm-12 px-0 mr-md-10 mh-72" :class="[ismobil, 'col-container']">
                                    <v-row no-gutters :class="['align-center', ismobil]">
                                        <v-col cols="auto" class="label-width col-md-3 col-sm-3 flex weight-400 line-height-30 font-16 py-1">Asunto</v-col>
                                        <v-col class="mh-72  col-md-9 col-sm-12">
                                            <v-text-field v-model="asunto" solo flat outlined  label="Escribe el asunto acá" />
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-row>                            
                            <v-row no-gutters :class="['mt-1 nofitication-form']">
                                <div class="col-md-12 col-sm-12 px-0 mr-md-10 mh-72" :class="[ismobil, 'col-container']">
                                    <v-row no-gutters :class="['align-center', ismobil]">
                                        <v-col cols="auto" class="label-width col-md-12 col-sm-12 flex weight-400 line-height-30 font-16 py-1">Cuerpo del mensaje (HTML)</v-col>
                                        <v-col class="mh-72  col-md-12 col-sm-12">
                                            <v-textarea v-model="body_" solo flat outlined  label="Escribe el HTML del mensaje acá" rows="4" no-resize/>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-row>
                     </div>
                     <div style="height: 300px" v-if="ismobil" class="col-container col-md-4 col-sm-4 px-0 mr-md-12 mb-5">
                         <div class="weight-400 font-12 mb-3"> Previsualización: </div>
                         <iframe srcdoc="body_" frameborder="0" class="bg-grey1" style="width: 100%; height: 100%"></iframe>
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
                    <span class="text-underline"> Editar </span>
                </dx-button>
            </div>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>

import {
    isValidResponse
} from '~/shared/utils/request'

export default {
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
            nombre: null,
            asunto: null,
            body_: null,
            rules: {
               
            },
            valid: true,
        }
    },
    methods: {
        async submitForm() {
            if (this.$refs.form.validate()) {
                
            }
        },
        close() {
            this.$refs.form.reset()
            this.$emit('close')
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'ismobile' : ''
        },
    },
}
</script>

<style lang="scss" scoped>
.notification-dialog {
    .mh-72 {
        min-height: 72px;
    }

    .mt-minus-50 {
        margin-top: -50px;
    }
    .label-width{
        margin-top: -20px;
    }
    .bg-grey1 {
        background-color: #f5f5f5;
    }
}
</style>
