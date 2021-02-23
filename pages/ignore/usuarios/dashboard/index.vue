<template>
  <div>
    <dx-bodytitle
      title="Estás en el Módulo de Administración"
      subtitle="Aquí podrás crear o modificar usuarios y revisar los documentos que se tramitan en tu Institución."
    />
    <v-container class="px-0 mt-15">
      <dx-dashboard />
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
