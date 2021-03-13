<template>
  <v-row no-gutters>
    <v-col cols="6" class="px-0 py-0">
      <p class="weight-400 mt-3 font-regular line-height-24">{{ title }}</p>
    </v-col>
    <v-col cols="6" class="text-right px-0 py-0 my-auto">
      <dx-button
        v-tooltip="{
          content: helpHint,
        }"
        color="primary"
        text
        class="px-0 py-0"
      >
        <dx-icon left>mdi-help-circle</dx-icon>
        <span class="pl-1 text-underline">Ayuda</span>
      </dx-button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DxStepTitle',
  props: {
    title: String,
    helpHint: String,
  },
}
</script>
