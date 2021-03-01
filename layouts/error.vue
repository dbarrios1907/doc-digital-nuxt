<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <ErrorPage />
    </h1>
    <h1 v-else>
      <div class="d-flex justify-content-center">
        <div class="text-h1">ERROR 500</div>
        <div class="text-h2">Opps, ha ocurrido un error inesperado</div>
      </div>
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
