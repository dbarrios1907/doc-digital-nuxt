<template>
  <div :class="['fill-height', { 'px-custom-6': ismobil }]">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10" />
    <admin-user-form :userid="getuserid" />
  </div>
</template>

<script>
import { isValidResponse } from '~/shared/utils/request'
export default {
  name: 'InsertarUsuario',
  data() {
    return {
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
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
    getuserid(){
      return this.$route.params.id
    }
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
</style>
