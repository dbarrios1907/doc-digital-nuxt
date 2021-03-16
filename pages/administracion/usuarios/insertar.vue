<template>
  <!-- <perfect-scrollbar :style="{ height: '100%' }"> -->
  <div :class="['fill-height', { 'px-custom-6': ismobil }]">
    <dx-breadcrumbs v-if="!ismobil" :items="breadcrums" class="mb-10" />
    <userform />
  </div>
  <!-- </perfect-scrollbar> -->
</template>

<script>
export default {
  name: 'InsertarUsuario',
  fetch() {
    console.log('FETCH ON USERS')
  },
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
          text: 'Nuevo usuario',
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
  },
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
.px-custom-6 {
  padding-right: 6px !important;
  padding-left: 6px !important;
}
</style>
