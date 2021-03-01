<template>
  <div>
    <dx-breadcrumbs :items="breadcrumbs" />
    <dx-userform />
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Administración',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Usuarios',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Nuevo Usuario',
          disabled: true,
          href: '',
        },
      ],
    }
  },
}
</script>
