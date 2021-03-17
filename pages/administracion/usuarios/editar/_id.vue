<template>
  <div :class="['fill-height', { 'px-custom-6': ismobil }]">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10" />
    <userform :user="getuser" />
  </div>
</template>

<script>
import { isValidResponse } from '~/shared/utils/request'
export default {
  name: 'InsertarUsuario',
  async fetch() {
     let resp = null
     try{ 
        resp = await this.$store.dispatch('usuarios/getUser', this.$route.params.id)
      }catch(error) {}

      const [valid, Toast] = isValidResponse(resp)

      if (!valid) {
        Toast.error({
          message: 'Usuario no encontrado',
        })
      }
      else{
        this.user = resp.result
      }
    
  },
  data() {
    return {
      user: {
        type: Object,
        default: {
         id : null,
         run: null,
         dv: null,
         nombres: null,
         apellidos: null,
         correoInstitucional: null,
         cargo: null,
         entidad: {
            id: null,
            nombre: null,
            entidadDependencia: null,
            correoOficinaPartes: null,
            region: null,
            provincia: null,
            comuna: null,
         },
         subrogante: null,
         isSubroganteActivado: false,
         seguidor: null,
         roles: [],    
         isBloqueado: false,
         nombreCompleto: null
        },
      },
      breadcrums: [
        {
          text: 'Administración',
          disabled: false,
          href: '#',
        },
        {
          text: 'Usuarios',
          disabled: false,
          href: '/administracion/usuarios',
        },
        {
          text: 'Editar usuario',
          disabled: true,
          href: '#',
        },
      ],
    }
  },
  created() {
    // this.userid = this.$route.params.id
    // console.log('REQUEST')
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    getuser(){
      return this.user
    }
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
</style>
