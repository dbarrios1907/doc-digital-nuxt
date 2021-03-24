<template>
  <!-- <perfect-scrollbar :style="{ height: '100%' }"> -->
  <div :class="['fill-height', { 'px-custom-6': ismobil }]">
    <dx-breadcrumbs :items="breadcrums" v-if="!ismobil" class="mb-10"/>
    <userform/>
  </div>
  <!-- </perfect-scrollbar> -->
</template>

<script>
export default {
  name: 'InsertarUsuario',
  fetch() {
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
<style scoped>
.px-custom-6 {
  padding-right: 6px !important;
  padding-left: 6px !important;
}
</style>
