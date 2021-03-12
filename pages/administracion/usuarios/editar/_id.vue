<template>
  <div :class="['fill-height', { 'px-custom-6': ismobil }]">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10" />
    <userform :userid="userid" />
  </div>
</template>

<script>
export default {
  name: 'InsertarUsuario',
  fetch() {
    console.log('FETCH ON USERS')
  },
  data() {
    return {
      userid: String,
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
    this.userid = this.$route.params.id
    console.log('REQUEST')
  },
  computed: {
    ismobil() {
      return this.$vuetify.breakpoint.xs ? 'ismobile' : ''
    },
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
</style>
