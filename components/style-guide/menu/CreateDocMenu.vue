<template>
  <v-menu offset-y>
    <template v-slot:activator="{ attrs, on }">
      <dx-button style="background-color: white" large color="primary" text v-bind="attrs" v-on="on">
        <span class="underline-text">{{ label }}</span>
        <dx-icon right chevron regular> mdi-chevron-down </dx-icon>
      </dx-button>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" link :ripple="false">
        <v-list-item-title>
          <span dx-link class="text-underline line-height-24 weight-400 text--primary">
            <NuxtLink :to="item.route">{{ item.name }}</NuxtLink>
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'CreateDocMenu',
  data: () => ({
    items: [
      {
        name: 'Enviar a firma',
        route: '/nuevo-documento/firmar',
      },
      {
        name: 'Enviar a distribución',
        route: '/nuevo-documento/visar',
      },
    ],
    label: 'Nuevo documento',
  }),
}
</script>
<style scoped>
[dx-link] a {
  color: inherit !important;
}
</style>
