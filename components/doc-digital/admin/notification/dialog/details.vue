<template>
<perfect-scrollbar :style="{ height: '100%', width: '100%' }">
    <v-dialog v-model="dialog" overlay-opacity="0.55" rlay-color="#001C41" max-width="603px" :content-class="ismobil" persistent>
        <v-card>
            <v-card-title>
                <h5 class="font-title weight-700 darken3--text font-roboto">Ver correo de notificación</h5>
                <v-spacer />
                <slot name="actionclose" />
            </v-card-title>
            <v-divider />

            <v-card-text class="mt-6">
                <v-row :class="['align-center mh-50 mt-10', ismobil]">
                    <v-col class="label-width col-md-12 col-12 weight-700 line-height-30 font-20 py-1 flex">Destinatario:</v-col>
                    <v-col class="col-md-12 col-12 weight-400 line-height-30 font-20">Nombre Nombre Apellido Apellido </v-col>
                </v-row>
                <v-row :class="['align-center mh-50 mt-10', ismobil]">
                    <v-col class="label-width col-12 col-sm-12 weight-700 line-height-30 font-20 py-1 flex">Asunto:</v-col>
                    <v-col class="col-md-12 col-12 weight-400 line-height-30 font-20">Asunto del correo acá </v-col>
                </v-row>
                <v-row :class="['align-center mh-50 mt-10', ismobil]">
                    <v-col class="label-width col-12 col-12 weight-700 line-height-30 font-20 py-1 flex">Cuerpo del mensaje (HTML):</v-col>
                    <v-col class="col-md-12 col-12 weight-400 line-height-30 font-20 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit velit justo, sed commodo dolor pulvinar nec. Ut ultrices ultricies neque. Ut massa magna, dapibus eget sapien vitae, pellentesque lobortis lacus. </v-col>
                </v-row>
                <div style="height: 300px" class="col-container col-md-12 col-12 px-0 mb-5 mt-7">
                    <div class="weight-700 font-20 mb-3"> Previsualización: </div>
                    <iframe frameborder="0" class="bg-grey1" style="width: 100%; height: 100%"></iframe>
                </div>
            </v-card-text>

            <v-card-actions>
                <div :class="['pr-2 mb-7', { 'text-center': ismobil }]">
                    <slot name="actions" />
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</perfect-scrollbar>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    computed: {
        ismobil() {
            return this.$vuetify.breakpoint.xs ? 'movil-container' : ''
        },
    },
}
</script>

<style scoped>
.bg-grey1 {
    background-color: #f5f5f5;
}

.v-sheet.v-card,
.v-dialog__content .v-dialog,
.v-dialog:not(.v-dialog--fullscreen) {
    border-radius: 0px !important;
    max-height: 100% !important;
}

.v-card__title {
    max-height: 60px !important;
    padding: 13px 15px 10px !important;
}

.theme--light .col {
    color: #373737 !important;
}

.v-card__actions {
    display: flow-root !important;
    text-align: right;
    margin-right: 10px;
}

.v-dialog-details {
    overflow-y: inherit !important;
}

.mh-50 {
    min-height: 50px;
}
</style>
