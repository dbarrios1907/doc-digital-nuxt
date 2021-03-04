<template>
  <!-- <perfect-scrollbar :style="{ height: '100%' }"> -->
  <div class="fill-height">
    <dx-breadcrumbs :items="breadcrums" />
    <dx-bodytitle class="mt-11">
      <template v-slot:title>
        <div class="weight-700 text-md-h4 line-height-31">Nuevo Usuario</div>
      </template>
    </dx-bodytitle>
    <v-col cols="12 d-none d-md-flex d-lg-flex d-xl-flex mt-13">
      <div class="weight-400 line-height-30 font-16">Complete el formulario para crear un nuevo usuario.</div>
    </v-col>
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
}
</script>
<style>
.v-select .v-input__slot {
  min-height: 48px !important;
}
</style>
