<template>
  <v-dialog overlay-opacity="0.55" :user="user" rlay-color="#001C41" v-model="dialog" max-width="525px" :content-class="ismobil" class="v-dialog-details">
    <v-card>
      <v-card-title>
        <h5 class="font-title weight-700 darken3--text font-roboto">Usuario</h5>
        <v-spacer></v-spacer>
        <slot name="actionclose" />
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="mt-6">
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Estado: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getestado}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">RUT: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getrut}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Nombre(s): </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getnombres}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Apellidos: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getapellidos}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Correo: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getemail}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Cargo: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getcargo}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']"
            >Permisos adicionales:
          </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getpermisos}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Subrogante: </v-col>
          <v-col class="weight-400 line-height-30 font-20"> {{getsubrogante}} </v-col>
        </v-row>
        <v-row :class="['align-center', ismobil]">
          <v-col cols="auto" style="weight-700 max-width: 140px" :class="['flex weight-700 line-height-30 font-20 py-1']">Seguidor: </v-col>
          <v-col class="weight-400 line-height-30 font-20">{{getseguidor}} </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <div :class="['pr-2 mb-7', { 'text-center': ismobil }]">
          <slot name="actions" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'userform-details',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    getestado(){
      return this.user ? (!this.user.isBloqueado ? 'Activo': 'Inactivo') : '-'
    },
    getrut(){
      return this.user ? (this.user.run + (this.user.dv ? '-' + this.user.dv : '-')) : '-'
    },    
    getnombres(){
      return this.user ? (this.user.nombres ? this.user.nombres : '-') : '-'
    }, 
    getapellidos(){
      return this.user ? (this.user.apellidos ? this.user.apellidos : '-') : '-'
    },
    getemail(){
      return this.user ? (this.user.correoInstitucional ? this.user.correoInstitucional : '-') : '-'
    },    
    getcargo(){
      return this.user ? (this.user.cargo ? this.user.cargo : '-') : '-'
    },    
    getpermisos(){
      return '-' //this.user ? (this.user.roles ? this.user.roles.join(', ') : '-') : '-'
    },
    getsubrogante(){
      return this.user ? (this.user.subrogante ? this.user.subrogante : '-') : '-'
    },    
    getseguidor(){
      return this.user ? (this.user.seguidor ? this.user.seguidor : '-') : '-'
    },
  },
}
</script>
<style scoped>
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
  overflow-y: none !important;
}
</style>
